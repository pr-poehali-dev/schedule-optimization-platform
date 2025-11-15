import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    { id: 'overview', icon: 'LayoutGrid', label: 'Обзор' },
    { id: 'schedule', icon: 'Calendar', label: 'Расписание школы' },
    { id: 'lessons', icon: 'Plus', label: 'Добавить урок' },
    { id: 'teachers', icon: 'Users', label: 'Учителя' },
    { id: 'map', icon: 'Map', label: '2D Схема школы' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' }
  ];

  const stats = [
    { icon: 'Users', label: 'Учителей', value: '67', color: 'bg-blue-100 text-blue-600' },
    { icon: 'GraduationCap', label: 'Классов', value: '24', color: 'bg-emerald-100 text-emerald-600' },
    { icon: 'BookOpen', label: 'Предметов', value: '18', color: 'bg-purple-100 text-purple-600' },
    { icon: 'CalendarCheck', label: 'Активных расписаний', value: '156', color: 'bg-orange-100 text-orange-600' }
  ];

  const recentActivities = [
    { text: 'Добавлен новый урок "Математика 10А"', time: '5 минут назад', type: 'success' },
    { text: 'Изменено расписание 7А класса', time: '1 час назад', type: 'info' },
    { text: 'Добавлен учитель Иванова М.С.', time: '2 часа назад', type: 'success' },
    { text: 'ИИ исправил 3 конфликта в расписании', time: '3 часа назад', type: 'warning' },
    { text: 'Экспортировано расписание в Excel', time: '5 часов назад', type: 'info' }
  ];

  const quickActions = [
    { icon: 'Plus', label: 'Добавить новый урок', color: 'from-blue-500 to-cyan-500' },
    { icon: 'UserPlus', label: 'Добавить учителя', color: 'from-emerald-500 to-green-500' },
    { icon: 'School', label: 'Создать новый класс', color: 'from-purple-500 to-pink-500' },
    { icon: 'Eye', label: 'Просмотреть расписание', color: 'from-orange-500 to-red-500' }
  ];

  const weekSchedule = [
    { day: 'Пн', lessons: 25 },
    { day: 'Вт', lessons: 33 },
    { day: 'Ср', lessons: 27 },
    { day: 'Чт', lessons: 26 },
    { day: 'Пт', lessons: 30 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex">
      <aside className="w-64 bg-white border-r sticky top-0 h-screen flex flex-col">
        <div className="p-6 border-b">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Icon name="Calendar" className="text-white" size={24} />
            </div>
            <div>
              <div className="font-bold text-lg">UstazTime</div>
              <div className="text-xs text-gray-500">Демо-панель</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Добро пожаловать, Администратор!</h1>
                <p className="text-gray-600 mt-1">Средняя школа №15 имени Абая</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
                <Icon name="Plus" className="mr-2" size={18} />
                Создать новое расписание
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border-2 hover:border-blue-200 transition-all hover:shadow-lg animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon name={stat.icon as any} size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Clock" className="text-blue-500" size={20} />
                  Последние действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-emerald-500' :
                      activity.type === 'warning' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-medium ${
                        activity.type === 'success' ? 'text-emerald-700' :
                        activity.type === 'warning' ? 'text-orange-700' :
                        'text-blue-700'
                      }`}>
                        {activity.text}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" className="text-orange-500" size={20} />
                  Быстрые действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start border-2 hover:border-blue-300"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                      <Icon name={action.icon as any} className="text-white" size={18} />
                    </div>
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BarChart3" className="text-purple-500" size={20} />
                Обзор недели
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-4 h-48">
                {weekSchedule.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                    <div className="text-sm font-medium text-gray-600">{day.lessons} уроков</div>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-emerald-500 rounded-t-lg transition-all hover:shadow-lg"
                      style={{ height: `${(day.lessons / 33) * 100}%` }}
                    />
                    <div className="text-sm font-semibold text-gray-700">{day.day}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
