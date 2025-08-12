import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Recipe {
  id: number;
  title: string;
  category: 'супы' | 'десерты' | 'мясные';
  cookTime: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Говяжий гуляш по-венгерски',
    category: 'мясные',
    cookTime: '2 часа',
    difficulty: 'Средне',
    image: '/img/2068aae8-02fb-4e75-a614-daacfb0ea124.jpg',
    description: 'Классический венгерский гуляш с говядиной, овощами и ароматными специями',
    ingredients: ['500г говядины', '2 луковицы', '3 картофелины', 'Паприка', 'Томатная паста'],
    instructions: ['Нарезать мясо кубиками', 'Обжарить лук', 'Добавить мясо и тушить', 'Добавить специи и овощи']
  },
  {
    id: 2,
    title: 'Домашний яблочный пирог',
    category: 'десерты',
    cookTime: '1 час',
    difficulty: 'Легко',
    image: '/img/87682fb0-ae9d-4407-9c85-558096e592dd.jpg',
    description: 'Ароматный пирог с сочными яблоками и хрустящей корочкой',
    ingredients: ['300г муки', '4 яблока', '150г сахара', '100г масла', 'Корица'],
    instructions: ['Приготовить тесто', 'Нарезать яблоки', 'Собрать пирог', 'Выпекать 45 минут']
  },
  {
    id: 3,
    title: 'Овощной суп с зеленью',
    category: 'супы',
    cookTime: '45 минут',
    difficulty: 'Легко',
    image: '/img/6fd3c593-06c8-4fe4-a8a8-1e5fcbbf27eb.jpg',
    description: 'Легкий и полезный суп из свежих овощей с ароматными травами',
    ingredients: ['2 моркови', '1 кабачок', 'Зелень', 'Картофель', 'Лук'],
    instructions: ['Нарезать овощи', 'Варить в бульоне', 'Добавить зелень', 'Подавать горячим']
  }
];

const cookingTips = [
  {
    title: 'Секрет ароматного бульона',
    tip: 'Добавьте в бульон лавровый лист и горошины черного перца за 10 минут до готовности'
  },
  {
    title: 'Идеальная корочка на пироге',
    tip: 'Смажьте тесто взбитым яйцом перед выпечкой для золотистого цвета'
  },
  {
    title: 'Сочность мяса',
    tip: 'Перед жаркой дайте мясу достичь комнатной температуры'
  }
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('все');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'все' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['все', 'супы', 'десерты', 'мясные'];

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-vintage-cream">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setSelectedRecipe(null)}
            variant="outline"
            className="mb-6 border-vintage-brown text-vintage-brown hover:bg-vintage-brown hover:text-vintage-cream"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад к рецептам
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg border-4 border-vintage-brown/20"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-4xl text-vintage-brown mb-4">{selectedRecipe.title}</h1>
                <p className="text-vintage-slate text-lg leading-relaxed">{selectedRecipe.description}</p>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <Badge variant="secondary" className="bg-vintage-brown/10 text-vintage-brown">
                  <Icon name="Clock" size={14} className="mr-1" />
                  {selectedRecipe.cookTime}
                </Badge>
                <Badge variant="secondary" className="bg-vintage-brown/10 text-vintage-brown">
                  <Icon name="ChefHat" size={14} className="mr-1" />
                  {selectedRecipe.difficulty}
                </Badge>
                <Badge variant="secondary" className="bg-vintage-brown/10 text-vintage-brown">
                  <Icon name="Tags" size={14} className="mr-1" />
                  {selectedRecipe.category}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="border-vintage-brown/20 bg-vintage-beige/30">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-vintage-brown flex items-center">
                  <Icon name="ShoppingBasket" size={24} className="mr-2" />
                  Ингредиенты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center text-vintage-slate">
                      <Icon name="Check" size={16} className="mr-3 text-vintage-brown" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-vintage-brown/20 bg-vintage-beige/30">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-vintage-brown flex items-center">
                  <Icon name="BookOpen" size={24} className="mr-2" />
                  Приготовление
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex text-vintage-slate">
                      <span className="bg-vintage-brown text-vintage-cream rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vintage-cream">
      {/* Header */}
      <header className="bg-vintage-beige border-b-4 border-vintage-brown/20 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="ChefHat" size={36} className="text-vintage-brown" />
              <h1 className="font-serif text-4xl text-vintage-brown font-bold">Винтажные Рецепты</h1>
            </div>
            <div className="flex items-center space-x-2 text-vintage-slate">
              <Icon name="BookOpen" size={20} />
              <span className="font-body italic">Кулинарные традиции</span>
            </div>
          </div>
          
          <nav className="flex space-x-8">
            <a href="#recipes" className="text-vintage-brown hover:text-vintage-brown-light transition-colors font-medium">
              Рецепты
            </a>
            <a href="#tips" className="text-vintage-brown hover:text-vintage-brown-light transition-colors font-medium">
              Советы
            </a>
            <a href="#contact" className="text-vintage-brown hover:text-vintage-brown-light transition-colors font-medium">
              Контакты
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-vintage-beige to-vintage-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-5xl text-vintage-brown mb-6">
            Добро пожаловать в мир<br />классической кухни
          </h2>
          <p className="text-xl text-vintage-slate max-w-2xl mx-auto leading-relaxed">
            Откройте для себя проверенные временем рецепты, передающиеся из поколения в поколение. 
            Каждое блюдо — это история, каждый ингредиент — частичка традиции.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section id="recipes" className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-3xl text-vintage-brown text-center mb-8">Поиск рецептов</h3>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vintage-slate" />
                <Input
                  placeholder="Найти рецепт..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-vintage-brown/30 focus:border-vintage-brown"
                />
              </div>
              
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-4 bg-vintage-beige border border-vintage-brown/20">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="data-[state=active]:bg-vintage-brown data-[state=active]:text-vintage-cream"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Recipe Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card 
                  key={recipe.id} 
                  className="hover:shadow-lg transition-all duration-300 border-vintage-brown/20 bg-vintage-beige/50 cursor-pointer hover:scale-105"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge 
                      className="absolute top-2 right-2 bg-vintage-brown/90 text-vintage-cream"
                    >
                      {recipe.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="font-serif text-xl text-vintage-brown">
                      {recipe.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-vintage-slate text-sm mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-vintage-slate">
                        <Icon name="Clock" size={16} className="mr-1" />
                        {recipe.cookTime}
                      </div>
                      <Badge variant="outline" className="border-vintage-brown text-vintage-brown">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Tips */}
      <section id="tips" className="py-16 bg-vintage-beige/30">
        <div className="container mx-auto px-4">
          <h3 className="font-serif text-3xl text-vintage-brown text-center mb-12">Кулинарные советы</h3>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cookingTips.map((tip, index) => (
              <Card key={index} className="border-vintage-brown/20 bg-vintage-cream/80">
                <CardHeader>
                  <CardTitle className="font-serif text-lg text-vintage-brown flex items-center">
                    <Icon name="Lightbulb" size={20} className="mr-2" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-vintage-slate italic">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-serif text-3xl text-vintage-brown mb-8">Свяжитесь с нами</h3>
          <div className="max-w-2xl mx-auto">
            <p className="text-vintage-slate text-lg mb-6">
              Есть семейный рецепт, которым хотите поделиться? Или вопрос о приготовлении? 
              Мы всегда рады общению с любителями кулинарии!
            </p>
            <div className="flex justify-center space-x-8 text-vintage-brown">
              <div className="flex items-center">
                <Icon name="Mail" size={20} className="mr-2" />
                <span>recipes@vintage.ru</span>
              </div>
              <div className="flex items-center">
                <Icon name="Phone" size={20} className="mr-2" />
                <span>+7 (495) 123-45-67</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vintage-brown text-vintage-cream py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon name="ChefHat" size={24} className="mr-2" />
            <span className="font-serif text-xl">Винтажные Рецепты</span>
          </div>
          <p className="text-vintage-cream/80">
            © 2024 Винтажные Рецепты. Создано с любовью к кулинарным традициям.
          </p>
        </div>
      </footer>
    </div>
  );
}