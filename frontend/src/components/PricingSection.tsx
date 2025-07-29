import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePriceOptions } from "@/hooks/useAdminData";

/**
 * Interfaz para definir la estructura de un precio
 */
interface PriceOption {
  id: number;
  price: number;
  category: string;
  ageRange: string;
  description?: string;
  color: string; // Añadido color para que coincida con el modelo de backend
  active: boolean; // Añadido active para que coincida con el modelo de backend
}

/**
 * Sección de precios con tarjetas interactivas
 * Muestra diferentes categorías de entrada con precios destacados
 */
export const PricingSection = () => {
  const { priceOptions: adminPriceOptions, loading, error } = usePriceOptions();

  // Mostrar solo las opciones de precio activas y mapear al formato correcto
  const priceOptions: PriceOption[] = adminPriceOptions
    .filter((option) => option.active)
    .map((option) => ({
      id: option.id,
      price: option.price,
      category: option.category,
      ageRange: option.ageRange,
      description: option.description,
      color: option.color, // Usar el color del backend
      active: option.active,

    }));

  /**
   * Formatea el precio para mostrar
   */
  const formatPrice = (price: number) => {
    return `S/ ${price.toFixed(1)}`;
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando precios...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <section id="tarifario" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-park-blue mb-4">
            Costos de Entrada y Actividades
          </h2>
          <div className="w-24 h-1 bg-park-orange mx-auto rounded"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Precios accesibles para que toda la familia disfrute de nuestras
            atracciones
          </p>
        </div>
        {/* * Autores: * - Samira Yamily Quispe Puma - Brando Lee Antay Corimaya
         *Fecha: junio de 2025*/}
        {/* Grid de tarjetas de precios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {priceOptions.map((option) => (
            <Card
              key={option.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 transform hover:scale-105 group",
                "bg-white hover:shadow-xl border-2",
              )}
            >


              <CardContent className="p-6 text-center">
                {/* Círculo con el precio */}
                <div
                  className={cn(
                    "w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center",
                    "text-white font-bold text-lg shadow-lg transform transition-all duration-300",
                    // Usar el color de la opción de precio, o un color por defecto si no está definido
                    option.color ? `bg-[${option.color}]` : "bg-park-blue",
                    option.category === "Discapacitados"
                      ? "bg-park-green"
                      : "group-hover:bg-park-orange",
                  )}
                  style={{ backgroundColor: option.color }} // Asegurar que el color se aplique directamente
                >
                  {formatPrice(option.price)}
                </div>

                {/* Categoría */}
                <h3 className="text-xl font-bold text-park-blue mb-2">
                  {option.category}
                </h3>

                {/* Rango de edad */}
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  {option.ageRange}
                </p>

                {/* Descripción */}
                {option.description && (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {option.description}
                  </p>
                )}
              </CardContent>
              {/* Efecto hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br from-park-blue/5 to-park-orange/5 rounded-lg",
                  "opacity-0 transition-opacity duration-300",
                  "hover:opacity-100",
                )}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};