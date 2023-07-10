import React from 'react';
import projectStyle from '../myprojects.module.css';
import projectplaceholder from '../../../../../../assets/general/projectplaceholder.png';

export default function Projectfile({ handleDisplay }) {
  return (
    <main className={projectStyle['mainPanel']}>
      <h1 className={projectStyle['title']}>Projects</h1>
      <section className={projectStyle['projectList']}>
        <div className={projectStyle['project']}>
          <div className={projectStyle['projectImage']}>
            <img src={projectplaceholder} alt="" />
          </div>
          <div className={projectStyle['projectDetails']}>
            <h1 className={projectStyle['projectName']}>Fintech Mobile App</h1>
          </div>
        </div>
        <div className={projectStyle['project']}>
          <div className={projectStyle['projectImage']}>
            <img src={projectplaceholder} alt="" />
          </div>
          <div className={projectStyle['projectDetails']}>
            <h1 className={projectStyle['projectName']}>Fintech Mobile App</h1>
          </div>
        </div>
        <div className={projectStyle['project']}>
          <div className={projectStyle['projectImage']}>
            <img src={projectplaceholder} alt="" />
          </div>
          <div className={projectStyle['projectDetails']}>
            <h1 className={projectStyle['projectName']}>Fintech Mobile App</h1>
          </div>
        </div>
        <div className={projectStyle['project']}>
          <div className={projectStyle['projectImage']}>
            <img src={projectplaceholder} alt="" />
          </div>
          <div className={projectStyle['projectDetails']}>
            <h1 className={projectStyle['projectName']}>Fintech Mobile App</h1>
          </div>
        </div>
      </section>
      <aside className={projectStyle['projectButton']}>
        <button
          className={projectStyle['uploadButton']}
          onClick={handleDisplay}
        >
          Upload Project
        </button>
      </aside>
    </main>
  );
}
