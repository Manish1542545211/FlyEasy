import { Link } from 'react-router-dom';

function ModuleCard({ module }) {
  const { id, title, description, path } = module;

  return (
    <article className="module-card" id={`module-card-${id}`}>
      <span className="module-card-number">
        {String(id).padStart(2, '0')}
      </span>
      <h3 className="module-card-title">{title}</h3>
      <p className="module-card-description">{description}</p>
      <Link to={path} className="module-card-link">
        View Module
      </Link>
    </article>
  );
}

export default ModuleCard;
