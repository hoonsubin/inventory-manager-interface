import './ExploreContainer.css';

/**
 * The component properties.
 * We only need the name of the container that will be rendered.
 */
interface ContainerProps {
  // the name that will be rendered
  name: string;
}

/**
 * A simple centered text rendering component. This is a template component that comes when initializing a new Ionic project.
 * In this project, we use this component as a replacer for displaying empty or invalid pages.
 */
const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
    </div>
  );
};

export default ExploreContainer;
