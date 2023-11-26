import { Link } from "react-router-dom";

/**
 * 
 * Page not found main section component
 */

const _404 = () => {
  return (
    <section>
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-y-5">
        <h1 className="mx-auto bg-gradient-to-l from-primary-content via-secondary to-primary bg-clip-text text-9xl font-bold text-transparent">
          404
        </h1>
        <p className="text-3xl font-medium text-neutral">Page not found</p>
        <Link className="btn-primary-content btn px-16" to="/">
          Go back
        </Link>
      </div>
    </section>
  );
};

export default _404;
