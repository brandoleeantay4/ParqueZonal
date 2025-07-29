import { useState } from "react";
import { useHeroSlides } from "@/hooks/useAdminData";
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
import { Plus, Edit, Trash2, Upload, Camera } from "lucide-react";
import type { HeroSlide } from "@/lib/adminStorage";
import { apiService } from "@/lib/adminStorage"; // Importar apiService
import { toast } from "@/hooks/use-toast"; // Importar useToast

export const HeroCarouselAdmin = () => {
  const { slides, add, update, remove, loading, error } = useHeroSlides();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    subtitle: "",
    title: "",
    description: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      image: "",
      subtitle: "",
      title: "",
      description: "",
    });
  };

  const handleAdd = async () => {
    if (!formData.image || !formData.title) return;
    setIsSubmitting(true);
    try {
      await add({
        ...formData,
        active: true,
      });
      toast({
        title: "Slide agregado",
        description: "El nuevo slide ha sido añadido exitosamente.",
      });
      resetForm();
      setIsAddModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Error al agregar slide",
        description: err.message || "Hubo un problema al añadir el slide.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setFormData({
      image: slide.image,
      subtitle: slide.subtitle,
      title: slide.title,
      description: slide.description,
    });
    setEditingSlide(slide);
  };

  const handleUpdate = async () => {
    if (!editingSlide || !formData.image || !formData.title) return;
    setIsSubmitting(true);
    try {
      await update(editingSlide.id, formData);
      toast({
        title: "Slide actualizado",
        description: "El slide ha sido actualizado exitosamente.",
      });
      resetForm();
      setEditingSlide(null);
    } catch (err: any) {
      toast({
        title: "Error al actualizar slide",
        description: err.message || "Hubo un problema al actualizar el slide.",
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
        title: "Slide eliminado",
        description: "El slide ha sido eliminado exitosamente.",
      });
    } catch (err: any) {
      toast({
        title: "Error al eliminar slide",
        description: err.message || "Hubo un problema al eliminar el slide.",
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
    return <div className="text-center py-8 text-gray-500">Cargando slides...</div>;
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
            Carrusel Principal
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona las imágenes del carrusel principal de la homepage
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
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
                      id="hero-image-upload-add"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="hero-image-upload-add"
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
                <Label htmlFor="subtitle">Subtítulo pequeño:</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subtitle: e.target.value,
                    }))
                  }
                  placeholder="Ej: Parque Zonal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título grande:</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Ej: CHAVÍN DE HUÁNTAR"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Texto breve:</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción del slide"
                  rows={3}
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
                  disabled={!formData.image || !formData.title || isSubmitting || isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? "Agregando..." : "Agregar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`http://localhost:5000${slide.image}`}
              alt={slide.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-park-orange mb-2">{slide.subtitle}</p>
              <h3 className="font-bold text-park-blue mb-2">{slide.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {slide.description}
              </p>

              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(slide)}
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
                        onClick={() => handleDelete(slide.id)}
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

      {slides.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay imágenes en el carrusel. Haz clic en "Agregar" para añadir la
          primera imagen.
        </div>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingSlide}
        onOpenChange={(open) => {
          if (!open) {
            setEditingSlide(null);
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
                    id="hero-image-upload-edit"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="hero-image-upload-edit"
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
              <Label htmlFor="edit-subtitle">Subtítulo pequeño:</Label>
              <Input
                id="edit-subtitle"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
                placeholder="Ej: Parque Zonal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-title">Título grande:</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Ej: CHAVÍN DE HUÁNTAR"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Texto breve:</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descripción del slide"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingSlide(null);
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.image || !formData.title || isSubmitting || isUploading}
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