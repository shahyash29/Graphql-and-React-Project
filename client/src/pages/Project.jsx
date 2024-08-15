import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import styles from './Project.module.css';  // Import the CSS Module

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className={styles.cardContainer}>
          <Link to="/" className={styles.backButton}>
            Back
          </Link>
          <h1 className={styles.projectTitle}>{data.project.name}</h1>
          <p className={styles.projectDescription}>{data.project.description}</p>
          <h5 className={styles.projectStatusTitle}>Project Status</h5>
          <p className={styles.projectStatus}>{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <EditProjectForm project={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}
