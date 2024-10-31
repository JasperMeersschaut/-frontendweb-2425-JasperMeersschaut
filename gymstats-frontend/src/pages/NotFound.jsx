function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404 :(</h1>
        <h2 className="mb-4">Oops! Page Not Found</h2>
        <p className="lead mb-4">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <a href="/" className="btn btn-primary btn-lg">
          Go Back Home
        </a>
      </div>
    </div>
  );
}
  
export default NotFound;