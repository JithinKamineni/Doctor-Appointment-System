import { cn } from '../../utils/helpers';

export default function Card({ children, className }) {
  return <div className={cn('card-base', className)}>{children}</div>;
}
