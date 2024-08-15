export default function ProjectCard({project}) {
  return (
      <div className="col-md-4">
          <div className="card mb-3" style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px'}}>
              <div className="card-body" style={{padding: '20px'}}>
                  <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title" style={{color: '#007bff'}}>{project.name}</h5>
                      <a className="btn btn-primary" href={`/projects/${project.id}`}>
                          View
                      </a>
                  </div>
                  <p className="small" style={{marginTop: '10px', fontStyle: 'italic'}}>
                      Status: <strong>{project.status}</strong>
                  </p>
              </div>
          </div>
      </div>
  )
}
