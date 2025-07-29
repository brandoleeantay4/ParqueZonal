import { useState } from "react";
import { useWonders } from "@/hooks/useAdminData";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2, Upload, Globe } from "lucide-react";
import type { Wonder } from "@/lib/adminStorage";
import { apiService } from "@/lib/adminStorage"; // Importar apiService
import { toast } from "@/hooks/use-toast"; // Importar useToast

export const WondersAdmin = () => {
  const { wonders, add, update, remove, loading, error } = useWonders();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWonder, setEditingWonder] = useState<Wonder | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "Réplica de",
    fullDescription: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      description: "Réplica de",
      fullDescription: "",
    });
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.image) return;
    setIsSubmitting(true);
    try {
      await add({
        ...formData,
        active: true,
      });
      toast({
        title: "Maravilla agregada",
        description: "La nueva maravilla ha sido añadida exitosamente.",
      });
      resetForm();
      setIsAddModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Error al agregar maravilla",
        description: err.message || "Hubo un problema al añadir la maravilla.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (wonder: Wonder) => {
    setFormData({
      name: wonder.name,
      image: wonder.image,
      description: wonder.description,
      fullDescription: wonder.fullDescription,
    });
    setEditingWonder(wonder);
  };

  const handleUpdate = async () => {
    if (!editingWonder || !formData.name || !formData.image) return;
    setIsSubmitting(true);
    try {
      await update(editingWonder.id, formData);
      toast({
        title: "Maravilla actualizada",
        description: "La maravilla ha sido actualizada exitosamente.",
      });
      resetForm();
      setEditingWonder(null);
    } catch (err: any) {
      toast({
        title: "Error al actualizar maravilla",
        description: err.message || "Hubo un problema al actualizar la maravilla.",
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
        title: "Maravilla eliminada",
        description: "La maravilla ha sido eliminada exitosamente.",
      });
    } catch (err: any) {
      toast({
        title: "Error al eliminar maravilla",
        description: err.message || "Hubo un problema al eliminar la maravilla.",
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
    return <div className="text-center py-8 text-gray-500">Cargando maravillas...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Maravillas del Mundo
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona las tarjetas del carrusel de Maravillas del Mundo
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
              <DialogTitle>Agregar Nueva Maravilla</DialogTitle>
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
                      id="wonders-image-upload-add"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="wonders-image-upload-add"
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

              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Maravilla</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ej: Cristo Redentor"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Descripción corta (para tarjeta)
                </Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Ej: Réplica del"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">
                  Descripción completa (para página de detalle)
                </Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullDescription: e.target.value,
                    }))
                  }
                  placeholder="Descripción detallada que aparecerá en la página de detalle de la maravilla"
                  rows={4}
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
                  disabled={!formData.name || !formData.image || isSubmitting || isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Agregando..." : "Agregar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wonders.map((wonder) => (
          <div
            key={wonder.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`http://localhost:5000${wonder.image}`}
              alt={wonder.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-park-orange mb-2">
                {wonder.description}
              </p>
              <h3 className="font-bold text-park-blue mb-4">{wonder.name}</h3>

              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(wonder)}
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
                      <AlertDialogTitle>¿Eliminar tarjeta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. La tarjeta se
                        eliminará permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(wonder.id)}
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

      {wonders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay maravillas. Haz clic en "Agregar" para añadir la primera
          maravilla.
        </div>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingWonder}
        onOpenChange={(open) => {
          if (!open) {
            setEditingWonder(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Maravilla</DialogTitle>
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
                    id="wonders-image-upload-edit"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="wonders-image-upload-edit"
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
                      src={`http://localhost:5000${formData.image}`}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre de la Maravilla</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej: Cristo Redentor"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">
                Descripción corta (para tarjeta)
              </Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Ej: Réplica del"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-fullDescription">
                Descripción completa (para página de detalle)
              </Label>
              <Textarea
                id="edit-fullDescription"
                value={formData.fullDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fullDescription: e.target.value,
                  }))
                }
                placeholder="Descripción detallada que aparecerá en la página de detalle de la maravilla"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingWonder(null);
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.name || !formData.image || isSubmitting || isUploading}
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