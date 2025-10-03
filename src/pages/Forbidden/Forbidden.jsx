import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react"; // react icon
// run: npm install lucide-react

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-200 text-center px-4">
      <LockKeyhole className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">403 - Forbidden</h1>
      <p className="text-gray-500 mb-6 max-w-md">
        You don’t have permission to access this page. Please contact the administrator if you think this is a mistake.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}
