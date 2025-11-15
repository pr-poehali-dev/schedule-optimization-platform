import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'CalendarClock',
      title: 'ИИ-расписание',
      description: 'Автоматические предложения исправлений и оптимизация расписания на основе искусственного интеллекта',
      color: 'bg-blue-500'
    },
    {
      icon: 'Map',
      title: '2D-визуал школы',
      description: 'Интерактивная карта кабинетов и помещений для удобной навигации и планирования',
      color: 'bg-emerald-500'
    },
    {
      icon: 'Bell',
      title: 'Push-уведомления',
      description: 'Обновления в реальном времени для всех участников образовательного процесса',
      color: 'bg-purple-500'
    },
    {
      icon: 'MessageCircle',
      title: 'Бот WhatsApp / Telegram',
      description: 'Расписание по запросу прямо в мессенджере — быстро и удобно',
      color: 'bg-green-500'
    },
    {
      icon: 'FileSpreadsheet',
      title: 'Экспорт Excel',
      description: 'Выгрузка расписания в файлы Excel одним кликом для дальнейшей работы',
      color: 'bg-cyan-500'
    },
    {
      icon: 'Smartphone',
      title: 'Кросс-платформенность',
      description: 'Можно смотреть в телефоне, ПК и где угодно — доступно на всех устройствах',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { value: '50+', label: 'Школ используют' },
    { value: '99%', label: 'Точность ИИ' },
    { value: '24/7', label: 'Поддержка' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Icon name="Calendar" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              UstazTime
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Главная</a>
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Функции</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Цены</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Контакты</a>
          </nav>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
          >
            Попробовать
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-4">
            🚀 EdTech платформа для современных школ
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Самое удобное{' '}
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              составление расписаний
            </span>{' '}
            для школ
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ИИ помогает администрациям экономить время, избегать конфликтов и автоматизировать планирование. Простой, быстрый и эффективный инструмент для вашей школы.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-lg px-8 py-6 group"
            >
              Попробовать Бесплатно
              <Icon name="Sparkles" className="ml-2 group-hover:rotate-12 transition-transform" size={20} />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              <Icon name="Play" className="mr-2" size={20} />
              Демо
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-1 bg-blue-50 rounded-full text-blue-600 text-sm font-medium">
              Функции
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Что умеет UstazTime</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Полный набор инструментов для эффективного управления расписанием
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx} 
                className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={feature.icon as any} className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Icon name="Calendar" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                UstazTime
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2025 UstazTime. Платформа для автоматизации школьных расписаний
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
