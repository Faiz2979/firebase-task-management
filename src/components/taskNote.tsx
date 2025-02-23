import React from 'react';



interface TaskNoteProps {
    title: string;
    desc: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const TaskNote: React.FC<TaskNoteProps> = ({ title, desc, status, createdAt, updatedAt }) => {
    return (
        <div className="task-note">
            <h2>{title}</h2>
            <p>{desc}</p>
            <p>Status: {status}</p>
            <p>Created At: {createdAt}</p>
            <p>Updated At: {updatedAt}</p>
        </div>
    );
};

export default TaskNote;