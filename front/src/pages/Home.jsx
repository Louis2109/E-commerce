import React from "react";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { ShoppingBag, Star, Users, Truck } from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Électronique", icon: "📱", count: "500+ produits" },
    { name: "Mode", icon: "👗", count: "300+ produits" },
    { name: "Maison", icon: "🏠", count: "200+ produits" },
    { name: "Beauté", icon: "💄", count: "150+ produits" },
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: "Large sélection",
      description: "Des milliers de produits disponibles",
    },
    {
      icon: Star,
      title: "Qualité garantie",
      description: "Produits vérifiés et notation clients",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Vendeurs et acheteurs de confiance",
    },
    {
      icon: Truck,
      title: "Livraison rapide",
      description: "Livraison dans toute la région",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary/10 to-accent-yellow/20 rounded-large mb-12">
        <h1 className="text-heading-large font-bold mb-6 text-text-primary-light dark:text-text-primary-dark">
          Bienvenue sur Mervason Marketplace
        </h1>
        <p className="text-body-large text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
          Découvrez une marketplace moderne où acheteurs et vendeurs se
          rencontrent. Parcourez notre catalogue ou devenez commerçant dès
          aujourd'hui.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Explorer les produits</Button>
          <Button variant="secondary" size="lg">
            Devenir vendeur
          </Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mb-16">
        <h2 className="text-heading-medium font-bold mb-8 text-center">
          Catégories populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-floating transition-shadow duration-300 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-body-small text-text-muted-light dark:text-text-muted-dark">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-heading-medium font-bold mb-8 text-center">
          Pourquoi choisir Mervason ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-heading-small">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-primary rounded-large text-white">
        <h2 className="text-heading-medium font-bold mb-4">
          Prêt à commencer ?
        </h2>
        <p className="text-body-large mb-8 opacity-90">
          Rejoignez des milliers d'utilisateurs satisfaits sur Mervason
          Marketplace
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
          >
            Créer un compte
          </Button>
          <Button
            variant="ghost"
            className="border-white text-white hover:bg-white/10"
          >
            En savoir plus
          </Button>
        </div>
      </section>
    </div>
  );
}
