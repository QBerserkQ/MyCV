import { useState } from "react";
import { Globe2, ArrowLeft, ArrowRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Panel } from "../Panel";
import { SectionLabel } from "../SectionLabel";
import { uploadToCloudinary } from "../../api/client";


export function ProjectsPanel({
                                  projects,
                                  projectsError,
                                  isLoggedIn,
                                  deleteProject,
                                  newProject,
                                  setNewProject,
                                  handleAddProject,
                              }) {

    const [projectIndex, setProjectIndex] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);


    const project = projects[projectIndex];


    const previous = () => {
        setProjectIndex((prev) =>
            prev === 0 ? projects.length - 1 : prev - 1
        );
    };


    const next = () => {
        setProjectIndex((prev) =>
            prev === projects.length - 1 ? 0 : prev + 1
        );
    };


    const handleFileChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;


        setUploading(true);
        setUploadError(null);


        try {

            const url = await uploadToCloudinary(file);

            setNewProject(prev => ({
                ...prev,
                imageUrl: url
            }));

        } catch {

            setUploadError("Не удалось загрузить фото");

        } finally {

            setUploading(false);

        }
    };


    if (!project) {
        return (
            <Panel className="p-6 sm:p-8">
                <SectionLabel icon={Globe2}>
                    Project gallery
                </SectionLabel>

                <p className="mt-5 text-sm text-slate-400">
                    No projects yet.
                </p>
            </Panel>
        );
    }



    return (

        <Panel
            id="projects"
            className="overflow-hidden p-6 sm:p-8"
        >

            <div className="flex items-end justify-between">

                <div>

                    <SectionLabel icon={Globe2}>
                        Project gallery / field notes
                    </SectionLabel>

                    <h2 className="font-serif text-3xl text-white sm:text-4xl">
                        Proof of craft.
                    </h2>

                </div>


                <div className="flex gap-2">

                    <button
                        onClick={previous}
                        className="metal-button"
                    >
                        <ArrowLeft className="h-4 w-4"/>
                    </button>


                    <button
                        onClick={next}
                        className="metal-button"
                    >
                        <ArrowRight className="h-4 w-4"/>
                    </button>

                </div>

            </div>



            <div className="mt-8 grid gap-7 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
                <div className="project-art relative overflow-hidden">

                    {project.imageUrl ? (

                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />

                    ) : (

                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">

                            <span className="text-5xl text-slate-600">
                                ✦
                            </span>

                        </div>

                    )}


                    <div className="scanlines"/>


                    <span className="absolute bottom-4 left-5 text-[9px] uppercase tracking-[0.28em] text-white/60">

                        Project {String(projectIndex + 1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}

                    </span>


                    <span className="absolute right-5 top-4 flex items-center gap-2 text-[9px] uppercase tracking-widest text-emerald-300">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>

                        Online

                    </span>


                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">

                        {project.theme}

                    </p>


                    <h3 className="mt-3 font-serif text-4xl text-white">

                        {project.title}

                    </h3>


                    <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">

                        {project.description}

                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">

                        {project.skills?.map(skill => (

                            <span
                                key={skill}
                                className="badge"
                            >
                                {skill}
                            </span>

                        ))}

                    </div>
                    {project.gitUrl && (

                        <a
                            href={project.gitUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300 transition hover:text-white"
                        >

                            View repository

                            <SiGithub className="h-4 w-4"/>

                        </a>

                    )}



                    {isLoggedIn && (

                        <button
                            onClick={() => deleteProject(project.id)}
                            className="mt-6 block text-xs uppercase tracking-wider text-red-400 hover:text-red-300"
                        >
                            Delete project
                        </button>

                    )}


                </div>


            </div>
            <div className="mt-8 flex gap-1.5">

                {projects.map((item,index)=>(

                    <button

                        key={item.id}

                        onClick={() => setProjectIndex(index)}

                        className={`h-1 transition-all ${
                            index === projectIndex
                                ? "w-10 bg-sky-300"
                                : "w-5 bg-slate-700 hover:bg-slate-500"
                        }`}

                    />

                ))}

            </div>
            {isLoggedIn && (

                <form
                    onSubmit={handleAddProject}
                    className="mt-10 flex flex-col gap-2 border-t border-slate-700/60 pt-5"
                >

                    <input
                        placeholder="Theme"
                        value={newProject.theme}
                        onChange={(e)=>
                            setNewProject(prev=>({
                                ...prev,
                                theme:e.target.value
                            }))
                        }
                        className="rounded bg-slate-800 px-2 py-1 text-sm"
                    />


                    <input
                        placeholder="Title"
                        value={newProject.title}
                        onChange={(e)=>
                            setNewProject(prev=>({
                                ...prev,
                                title:e.target.value
                            }))
                        }
                        className="rounded bg-slate-800 px-2 py-1 text-sm"
                    />


                    <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e)=>
                            setNewProject(prev=>({
                                ...prev,
                                description:e.target.value
                            }))
                        }
                        className="rounded bg-slate-800 px-2 py-1 text-sm"
                    />

                    <input
                        placeholder="GitHub URL"
                        value={newProject.gitUrl}
                        onChange={(e) =>
                            setNewProject(prev => ({
                                ...prev,
                                gitUrl: e.target.value
                            }))
                        }
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />

                    <input
                        placeholder="Skills,"
                        value={newProject.skillsInput}
                        onChange={(e) =>
                            setNewProject(prev => ({
                                ...prev,
                                skillsInput: e.target.value
                            }))
                        }
                        className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />


                    {uploading &&
                        <p className="text-xs text-sky-300">
                            Uploading...
                        </p>
                    }


                    {uploadError &&
                        <p className="text-xs text-red-400">
                            {uploadError}
                        </p>
                    }



                    <button className="mt-1 bg-sky-300 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#07131e] hover:bg-sky-200">
                        Add project
                    </button>


                </form>

            )}



        </Panel>

    );
}