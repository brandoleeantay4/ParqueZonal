import { useState } from "react";
import { useGroupImages } from "@/hooks/useAdminData";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2, Upload, Users } from "lucide-react";
import type { GroupImage } from "@/lib/adminStorage";
import { apiService } from "@/lib/adminStorage"; // Importar apiService
import { toast } from "@/hooks/use-toast"; // Importar useToast

export const GroupsAdmin = () => {
  const { groupImages, add, update, remove, loading, error } = useGroupImages();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GroupImage | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    caption: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      image: "",
      caption: "",
    });
  };

  const handleAdd = async () => {
    if (!formData.image || !formData.caption) return;
    setIsSubmitting(true);
    try {
      await add({
        image: formData.image,
        caption: formData.caption,
        active: true,
      });
      toast({
        title: "Imagen de grupo agregada",
        description: "La nueva imagen ha sido añadida exitosamente.",
      });
      resetForm();
      setIsAddModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Error al agregar imagen",
        description: err.message || "Hubo un problema al añadir la imagen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (image: GroupImage) => {
    setEditingImage(image);
    setFormData({
      image: image.image,
      caption: image.caption,
    });
  };

  const handleUpdate = async () => {
    if (!editingImage || !formData.image || !formData.caption) return;
    setIsSubmitting(true);
    try {
      await update(editingImage.id, {
        image: formData.image,
        caption: formData.caption,
        active: editingImage.active,
      });
      toast({
        title: "Imagen de grupo actualizada",
        description: "La imagen ha sido actualizada exitosamente.",
      });
      resetForm();
      setEditingImage(null);
    } catch (err: any) {
      toast({
        title: "Error al actualizar imagen",
        description: err.message || "Hubo un problema al actualizar la imagen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
      toast({
        title: "Imagen de grupo eliminada",
        description: "La imagen ha sido eliminada exitosamente.",
      });
    } catch (err: any) {
      toast({
        title: "Error al eliminar imagen",
        description: err.message || "Hubo un problema al eliminar la imagen.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await apiService.uploadImage(formData);
        setFormData((prev) => ({ ...prev, image: response.filePath }));
        toast({
          title: "Imagen subida",
          description: "La imagen se ha subido exitosamente.",
        });
      } catch (err: any) {
        toast({
          title: "Error al subir imagen",
          description: err.message || "Hubo un problema al subir la imagen.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando imágenes de grupo...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grupos Grandes</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las imágenes del carrusel pequeño de Grupos Grandes
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Imagen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Upload de imagen */}
              <div className="space-y-2">
                <Label>Seleccionar imagen</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="groups-image-upload-add"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="groups-image-upload-add"
                      className="cursor-pointer"
                    >
                      {isUploading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>Subiendo...</span>
                        </div>
                      ) : (
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      )}
                      <p className="text-sm text-gray-600">
                        Haz clic para seleccionar una imagen o arrastra aquí
                      </p>
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-4">
                      <img
                        src={`http://localhost:5000${formData.image}`}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Campo Caption */}
              <div className="space-y-2">
                <Label htmlFor="caption-add">Texto de la imagen</Label>
                <Textarea
                  id="caption-add"
                  value={formData.caption}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  placeholder="Texto que aparecerá sobre la imagen en el carrusel"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setIsAddModalOpen(false);
                  }}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!formData.image || !formData.caption || isSubmitting || isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Agregando..." : "Agregar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupImages.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={image.image}
              alt=""
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-park-blue mb-4">{image.caption}</h3>

              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded flex items-center justify-center space-x-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar</span>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Eliminar imagen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. La imagen se eliminará
                        permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(image.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      {groupImages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay imágenes. Haz clic en "Agregar" para añadir la primera imagen.
        </div>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingImage}
        onOpenChange={(open) => {
          if (!open) {
            setEditingImage(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Upload de imagen */}
            <div className="space-y-2">
              <Label>Cambiar imagen</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="groups-image-upload-edit"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="groups-image-upload-edit"
                    className="cursor-pointer"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Subiendo...</span>
                      </div>
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    )}
                    <p className="text-sm text-gray-600">
                      Haz clic para cambiar la imagen
                    </p>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                  </div>
                )}
              </div>
            </div>

            {/* Campo Caption */}
            <div className="space-y-2">
              <Label htmlFor="caption-edit">Texto de la imagen</Label>
              <Textarea
                id="caption-edit"
                value={formData.caption}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, caption: e.target.value }))
                }
                placeholder="Texto que aparecerá sobre la imagen en el carrusel"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingImage(null);
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image || !formData.caption || isSubmitting || isUploading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};