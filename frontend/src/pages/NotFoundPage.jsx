import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-slate-900">404</h1>
        <p className="mt-3 text-sm text-slate-500">The page you are looking for does not exist.</p>
        <Link to="/home" className="mt-6 inline-block">
          <Button>Back to Home</Button>
        </Link>
      </Card>
    </div>
  );
}
