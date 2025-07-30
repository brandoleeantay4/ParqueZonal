import { useState } from "react";
import { useAnimals } from "@/hooks/useAdminData";
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
import {
  Plus,
  Edit,
  Trash2,
  EyeOff,
  Eye,
  Upload,
  PawPrint,
} from "lucide-react";
import type { Animal } from "@/lib/adminStorage";
import { apiService } from "@/lib/adminStorage"; // Importar apiService
import { toast } from "@/hooks/use-toast"; // Importar useToast

export const ZooAdmin = () => {
  const { animals, add, update, remove, loading, error } = useAnimals();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    description: "",
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      scientificName: "",
      description: "",
      image: "",
    });
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.scientificName || !formData.image) return;
    setIsSubmitting(true);
    try {
      await add({
        ...formData,
        active: true,
      });
      toast({
        title: "Animal agregado",
        description: "El nuevo animal ha sido añadido exitosamente.",
      });
      resetForm();
      setIsAddModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Error al agregar animal",
        description: err.message || "Hubo un problema al añadir el animal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (animal: Animal) => {
    setFormData({
      name: animal.name,
      scientificName: animal.scientificName,
      description: animal.description,
      image: animal.image,
    });
    setEditingAnimal(animal);
  };

  const handleUpdate = async () => {
    if (
      !editingAnimal ||
      !formData.name ||
      !formData.scientificName ||
      !formData.image
    )
      return;
    setIsSubmitting(true);
    try {
      await update(editingAnimal.id, formData);
      toast({
        title: "Animal actualizado",
        description: "El animal ha sido actualizado exitosamente.",
      });
      resetForm();
      setEditingAnimal(null);
    } catch (err: any) {
      toast({
        title: "Error al actualizar animal",
        description: err.message || "Hubo un problema al actualizar el animal.",
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
        title: "Animal eliminado",
        description: "El animal ha sido eliminado exitosamente.",
      });
    } catch (err: any) {
      toast({
        title: "Error al eliminar animal",
        description: err.message || "Hubo un problema al eliminar el animal.",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: number) => {
    const animal = animals.find((a) => a.id === id);
    if (animal) {
      try {
        await update(id, { active: !animal.active });
        toast({
          title: "Estado de animal actualizado",
          description: `El animal ha sido ${animal.active ? "ocultado" : "mostrado"} exitosamente.`,
        });
      } catch (err: any) {
        toast({
          title: "Error al cambiar estado",
          description: err.message || "Hubo un problema al cambiar el estado del animal.",
          variant: "destructive",
        });
      }
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
    return <div className="text-center py-8 text-gray-500">Cargando animales...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header con botón agregar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Zoo y Animales</h1>
          <p className="text-gray-600 mt-1">
            Gestiona las tarjetas de la galería de Zoo y Animales
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
              <DialogTitle>Agregar Nuevo Animal</DialogTitle>
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
                      id="zoo-image-upload-add"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="zoo-image-upload-add"
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
                <Label htmlFor="name">Nombre común</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ej: León Africano"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scientificName">Nombre científico</Label>
                <Input
                  id="scientificName"
                  value={formData.scientificName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      scientificName: e.target.value,
                    }))
                  }
                  placeholder="Ej: Panthera leo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Breve descripción del animal
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descripción del animal, sus características y hábitat"
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
                  disabled={
                    !formData.name ||
                    !formData.scientificName ||
                    !formData.image ||
                    isSubmitting ||
                    isUploading
                  }
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
        {animals.map((animal) => (
          <div
            key={animal.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${!animal.active ? "opacity-50" : ""}`}
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-park-blue mb-2">{animal.name}</h3>
              <p className="text-sm text-park-orange italic mb-2">
                {animal.scientificName}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {animal.description}
              </p>

              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(animal)}
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
                        onClick={() => handleDelete(animal.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <button
                  onClick={() => handleToggleActive(animal.id)}
                  className={`flex-1 text-white text-sm py-2 px-3 rounded flex items-center justify-center space-x-1 ${animal.active ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"}`}
                >
                  {animal.active ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  <span>{animal.active ? "Ocultar" : "Mostrar"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {animals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay animales. Haz clic en "Agregar" para añadir el primer animal.
        </div>
      )}

      {/* Modal de edición */}
      <Dialog
        open={!!editingAnimal}
        onOpenChange={(open) => {
          if (!open) {
            setEditingAnimal(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Animal</DialogTitle>
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
                    id="zoo-image-upload-edit"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="zoo-image-upload-edit"
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

            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre común</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej: León Africano"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-scientificName">Nombre científico</Label>
              <Input
                id="edit-scientificName"
                value={formData.scientificName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    scientificName: e.target.value,
                  }))
                }
                placeholder="Ej: Panthera leo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">
                Breve descripción del animal
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Descripción del animal, sus características y hábitat"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingAnimal(null);
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={
                  !formData.name ||
                  !formData.scientificName ||
                  !formData.image ||
                  isSubmitting ||
                  isUploading
                }
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