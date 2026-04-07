import { Bell } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { notificationsApi } from '../../api/api';
import EmptyState from '../common/EmptyState';
import Modal from '../common/Modal';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const data = await notificationsApi.getMine();
      setNotifications(data);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.isRead).length, [notifications]);

  const handleOpen = async () => {
    setIsOpen(true);
    const unreadItems = notifications.filter((item) => !item.isRead);
    await Promise.allSettled(unreadItems.map((item) => notificationsApi.markRead(item.id)));
    await loadNotifications();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="relative rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-50"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Notifications">
        {notifications.length === 0 ? (
          <EmptyState title="No notifications" description="You are all caught up for now." />
        ) : (
          <div className="max-h-[60vh] space-y-3 overflow-y-auto">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                  </div>
                  {!item.isRead ? <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" /> : null}
                </div>
                <p className="mt-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
