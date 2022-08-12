import { useAppSelector } from '../store/hooks';
import { selectAll } from '../store/slices/notificationSlice';

export const NotificationsPage = () => {
  const notifications = useAppSelector(selectAll);

  return (
    <div>
      {notifications.map((n) => (
        <div key={n.id}>{n.id}</div>
      ))}
    </div>
  );
};
