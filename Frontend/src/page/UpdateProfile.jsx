import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProfile } from "../redux/profileSlice";
import { useNavigate } from "react-router-dom";

const UpdateformData = () => {
	const { profile } = useSelector((state) => state.profile);
	const [checkedFields, setCheckedFields] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState([]);

	useEffect(() => {
		setFormData({
			name: profile.name || "",
			IAM: profile.IAM.join(" | ") || [],
			image: profile.image || "",
			genre: profile.genre || "",
			about: profile.about || "",
			socialLinks: {
				gitHub: profile.socialLinks?.gitHub || "",
				linkedIn: profile.socialLinks?.linkedIn || "",
				twitter: profile.socialLinks?.twitter || "",
				instagram: profile.socialLinks?.instagram || "",
				facebook: profile.socialLinks?.facebook || "",
				youtube: profile.socialLinks?.youtube || "",
			},
			resume: profile.resume || "",
			education: {
				tenth: {
					institution: profile.education?.tenth?.institution || "",
					year: profile.education?.tenth?.year || "",
					percentage: profile.education?.tenth?.percentage || "",
				},
				twelfth: {
					institution: profile.education?.twelfth?.institution || "",
					year: profile.education?.twelfth?.year || "",
					percentage: profile.education?.twelfth?.percentage || "",
				},
				graduation: {
					institution: profile.education?.graduation?.institution || "",
					year: profile.education?.graduation?.year || "",
					percentage: profile.education?.graduation?.percentage || "",
				},
			},
			skills: {
				language: profile.skills?.language.join(" | ") || [],
				tools: profile.skills?.tools.join(" | ") || [],
				tech: profile.skills?.tech.join(" | ") || [],
				database: profile.skills?.database.join(" | ") || [],
				os: profile.skills?.os.join(" | ") || [],
				fundamentals: profile.skills?.fundamentals.join(" | ") || [],
				others: profile.skills?.others.join(" | ") || [],
			},
		});
	}, [profile, dispatch]);

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setFormData((prev) => ({
				...prev,
				[name]: files[0],
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleCheckBoxChange = (e) => {
		const { name, checked } = e.target;
		if (checked) {
			setCheckedFields((prev) => [...prev, name]);
		} else {
			setCheckedFields((prev) => prev.filter((field) => field !== name));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formDataToSubmit = new FormData();
			console.log(formData);
			Object.keys(formData).forEach((key) => {
				if (checkedFields.includes(`${key}Check`)) {
					if (
						typeof formData[key] === "object" &&
						!(formData[key] instanceof File)
					) {
						Object.keys(formData[key]).forEach((subKey) => {
							if (typeof formData[key][subKey] === "object") {
								Object.keys(formData[key][subKey]).forEach((innerKey) => {
									if (
										checkedFields.includes(`${subKey}${innerKey}Check`) &&
										checkedFields.includes(`${key}Check`) &&
										checkedFields.includes(`${subKey}Check`)
									) {
										formDataToSubmit.append(
											`${key}[${subKey}][${innerKey}]`,
											formData[key][subKey][innerKey]
										);
									}
								});
							} else {
								if (checkedFields.includes(`${subKey}Check`)) {
									formDataToSubmit.append(
										`${key}[${subKey}]`,
										formData[key][subKey]
									);
								}
							}
						});
					} else {
						formDataToSubmit.append(key, formData[key]);
					}
				}
			});

			const response = await axios.post(
				"/v1/admin/update-profile",
				formDataToSubmit,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				dispatch(setProfile(response.data.profile));
				navigate("/");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	return (
		<div className="">
			<h1>Update Profile</h1>
			<div className="container border flex justify-center p-8">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-1 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								name="nameCheck"
								id="nameCheck"
								onChange={handleCheckBoxChange}
							/>
							<label htmlFor="name">Name:</label>
						</div>
						<input
							className="px-3 py-2 rounded-lg bg-gray-800 col-span-2"
							value={formData.name}
							type="text"
							id="name"
							name="name"
							required
							onChange={handleChange}
							disabled={!checkedFields.includes("nameCheck") ? "disabled" : ""}
						/>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-1 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="IAMCheck"
								id="IAMCheck"
							/>
							<label htmlFor="IAM">IAM:</label>
						</div>
						<input
							value={formData.IAM}
							className="px-3 py-2 rounded-lg bg-gray-800 col-span-2"
							type="text"
							id="IAM"
							name="IAM"
							required
							onChange={handleChange}
							disabled={!checkedFields.includes("IAMCheck") ? "disabled" : ""}
						/>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-1 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="imageCheck"
								id="imageCheck"
							/>
							<label htmlFor="image">Image:</label>
						</div>

						<input
							className="px-3 py-2 rounded-lg bg-gray-800 border col-span-1"
							type="file"
							id="image"
							name="image"
							accept="image/*"
							required
							onChange={handleChange}
							disabled={!checkedFields.includes("imageCheck") ? "disabled" : ""}
						/>
						<input
							className="px-3 py-2 rounded-lg bg-gray-800 col-span-1 ml-2"
							type="text"
							disabled
							value={formData.image ? formData.image : "No image uploaded"}
						/>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-1 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="genreCheck"
								id="genreCheck"
							/>
							<label htmlFor="genre">Genre:</label>
						</div>

						<input
							className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
							type="text"
							id="genre"
							name="genre"
							required
							onChange={handleChange}
							value={formData?.genre}
							disabled={!checkedFields.includes("genreCheck") ? "disabled" : ""}
						/>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-1 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="aboutCheck"
								id="aboutCheck"
							/>
							<label htmlFor="about">About:</label>
						</div>
						<input
							className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
							type="text"
							id="about"
							name="about"
							required
							onChange={handleChange}
							value={formData?.about}
							disabled={!checkedFields.includes("aboutCheck") ? "disabled" : ""}
						/>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-3 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="socialLinksCheck"
								id="socialLinksCheck"
							/>
							<label htmlFor="social">Social Account:</label>
						</div>
					</div>
					<div className="grid px-7 gap-4 grid-cols-3">
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="gitHubCheck"
									id="gitHubCheck"
									disabled={
										!checkedFields.includes("socialLinksCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="github">GitHub:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="github"
								name="github"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											socialLinks: {
												...prev.socialLinks,
												gitHub: e.target.value,
											},
										};
									});
								}}
								value={formData?.socialLinks?.gitHub}
								disabled={
									!checkedFields.includes("gitHubCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="linkedInCheck"
									id="linkedInCheck"
									disabled={
										!checkedFields.includes("socialLinksCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="linkedin">LinkedIN:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="linkedin"
								name="linkedin"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											socialLinks: {
												...prev.socialLinks,
												linkedIn: e.target.value,
											},
										};
									});
								}}
								value={formData?.socialLinks?.linkedIn}
								disabled={
									!checkedFields.includes("linkedInCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="twitterCheck"
									id="twitterCheck"
									disabled={
										!checkedFields.includes("socialLinksCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="twitter">Twitter:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="twitter"
								name="twitter"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											socialLinks: {
												...prev.socialLinks,
												twitter: e.target.value,
											},
										};
									});
								}}
								value={formData?.socialLinks?.twitter}
								disabled={
									!checkedFields.includes("twitterCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="instagramCheck"
									id="instagramCheck"
									disabled={
										!checkedFields.includes("socialLinksCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="instagram">Instagram:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="instagram"
								name="instagram"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											socialLinks: {
												...prev.socialLinks,
												instagram: e.target.value,
											},
										};
									});
								}}
								value={formData?.socialLinks?.instagram}
								disabled={
									!checkedFields.includes("instagramCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="facebookCheck"
									id="facebookCheck"
									disabled={
										!checkedFields.includes("socialLinksCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="facebook">Facebook:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="facebook"
								name="facebook"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											socialLinks: {
												...prev.socialLinks,
												facebook: e.target.value,
											},
										};
									});
								}}
								value={formData?.socialLinks?.facebook}
								disabled={
									!checkedFields.includes("facebookCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="youtubeCheck"
									id="youtubeCheck"
									disabled={
										!checkedFields.includes("socialLinksCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="youtube">Youtube:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="youtube"
								name="youtube"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											socialLinks: {
												...prev.socialLinks,
												youtube: e.target.value,
											},
										};
									});
								}}
								value={formData?.socialLinks?.youtube}
								disabled={
									!checkedFields.includes("youtubeCheck") ? "disabled" : ""
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-1 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="resumeCheck"
								id="resumeCheck"
							/>
							<label htmlFor="resume">Resume:</label>
						</div>

						<input
							className="px-3 py-2 rounded-lg bg-gray-800 border col-span-1"
							type="file"
							id="resume"
							name="resume"
							accept=".pdf,.doc,.docx"
							required
							onChange={handleChange}
							disabled={
								!checkedFields.includes("resumeCheck") ? "disabled" : ""
							}
						/>
						<input
							className="px-3 py-2 rounded-lg bg-gray-800 col-span-1 ml-2"
							type="text"
							disabled
							value={formData?.resume}
						/>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-3 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="educationCheck"
								id="educationCheck"
							/>
							<label htmlFor="edu">Education Details:</label>
						</div>
					</div>
					<div className="grid px-7 gap-4 grid-cols-3">
						<div className="grid grid-cols-3">
							<div className="flex gap-4 col-span-3 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="tenthCheck"
									id="tenthCheck"
									disabled={
										!checkedFields.includes("educationCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="tenth">10th:</label>
							</div>
						</div>
					</div>
					<div className="grid px-14 gap-4 grid-cols-2 mx-auto">
						<div className="grid grid-cols-3 col-span-2 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="tenthinstitutionCheck"
									id="tenthinstitutionCheck"
									disabled={
										!checkedFields.includes("tenthCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="tenthInst">Institution:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="tenthInst"
								name="tenthInst"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												tenth: {
													...prev.education.tenth,
													institution: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.tenth?.institution}
								disabled={
									!checkedFields.includes("tenthinstitutionCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="tenthyearCheck"
									id="tenthyearCheck"
									disabled={
										!checkedFields.includes("tenthCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="tenthYear">Year:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="tenthYear"
								name="tenthYear"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												tenth: {
													...prev.education.tenth,
													year: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.tenth?.year}
								disabled={
									!checkedFields.includes("tenthyearCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="tenthpercentageCheck"
									id="tenthpercentageCheck"
									disabled={
										!checkedFields.includes("tenthCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="tenthPer">Percentage/CGPA:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-1"
								type="text"
								id="tenthPer"
								name="tenthPer"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												tenth: {
													...prev.education.tenth,
													percentage: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.tenth?.percentage}
								disabled={
									!checkedFields.includes("tenthpercentageCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
					</div>
					<div className="grid px-7 gap-4 grid-cols-3">
						<div className="grid grid-cols-3">
							<div className="flex gap-4 col-span-3 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="twelfthCheck"
									id="twelfthCheck"
									disabled={
										!checkedFields.includes("educationCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="twelth">12th:</label>
							</div>
						</div>
					</div>
					<div className="grid px-14 gap-4 grid-cols-2 mx-auto">
						<div className="grid grid-cols-3 col-span-2 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="twelfthinstitutionCheck"
									id="twelfthinstitutionCheck"
									disabled={
										!checkedFields.includes("twelfthCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="twelthInst">Institution:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="twelthInst"
								name="twelthInst"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												twelfth: {
													...prev.education.twelfth,
													institution: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.twelfth?.institution}
								disabled={
									!checkedFields.includes("twelfthinstitutionCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="twelfthyearCheck"
									id="twelfthyearCheck"
									disabled={
										!checkedFields.includes("twelfthCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="twelthYear">Year:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="twelthYear"
								name="twelthYear"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												twelfth: {
													...prev.education.twelfth,
													year: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.twelfth?.year}
								disabled={
									!checkedFields.includes("twelfthyearCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="twelfthpercentageCheck"
									id="twelfthpercentageCheck"
									disabled={
										!checkedFields.includes("twelfthCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="twelthPer">Percentage/CGPA:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-1"
								type="text"
								id="twelthPer"
								name="twelthPer"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												twelfth: {
													...prev.education.twelfth,
													percentage: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.twelfth?.percentage}
								disabled={
									!checkedFields.includes("twelfthpercentageCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
					</div>
					<div className="grid px-7 gap-4 grid-cols-3">
						<div className="grid grid-cols-3">
							<div className="flex gap-4 col-span-3 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="graduationCheck"
									id="graduationCheck"
									disabled={
										!checkedFields.includes("educationCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="grad">Graduation:</label>
							</div>
						</div>
					</div>
					<div className="grid px-14 gap-4 grid-cols-2 mx-auto">
						<div className="grid grid-cols-3 col-span-2 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="graduationinstitutionCheck"
									id="graduationinstitutionCheck"
									disabled={
										!checkedFields.includes("graduationCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="gradInst">Institution:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="gradInst"
								name="gradInst"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												graduation: {
													...prev.education.graduation,
													institution: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.graduation?.institution}
								disabled={
									!checkedFields.includes("graduationinstitutionCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="graduationyearCheck"
									id="graduationyearCheck"
									disabled={
										!checkedFields.includes("graduationCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="gradYear">Year:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="gradYear"
								name="gradYear"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												graduation: {
													...prev.education.graduation,
													year: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.graduation?.year}
								disabled={
									!checkedFields.includes("graduationyearCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="graduationpercentageCheck"
									id="graduationpercentageCheck"
									disabled={
										!checkedFields.includes("graduationCheck") ||
										!checkedFields.includes("educationCheck")
											? "disabled"
											: ""
									}
								/>
								<label htmlFor="gradPer">Percentage/CGPA:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-1"
								type="text"
								id="gradPer"
								name="gradPer"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											education: {
												...prev.education,
												graduation: {
													...prev.education.graduation,
													percentage: e.target.value,
												},
											},
										};
									});
								}}
								value={formData?.education?.graduation?.percentage}
								disabled={
									!checkedFields.includes("graduationpercentageCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-3">
						<div className="flex gap-4 col-span-3 items-center">
							<input
								className="px-3 py-2 rounded-lg bg-gray-800"
								type="checkbox"
								onChange={handleCheckBoxChange}
								name="skillsCheck"
								id="skillsCheck"
							/>
							<label htmlFor="skill">Skills:</label>
						</div>
					</div>
					<div className="grid px-7 gap-4 grid-cols-3">
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="languageCheck"
									id="languageCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="language">Language:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="language"
								name="language"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												language: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.language}
								disabled={
									!checkedFields.includes("languageCheck") ||
									!checkedFields.includes("skillsCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="toolsCheck"
									id="toolsCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="tools">Tools:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="tools"
								name="tools"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												tools: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.tools}
								disabled={
									!checkedFields.includes("toolsCheck") ||
									!checkedFields.includes("skillsCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="techCheck"
									id="techCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="tech">Tech:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="tech"
								name="tech"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												tech: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.tech}
								disabled={
									!checkedFields.includes("techCheck") ||
									!checkedFields.includes("skillsCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="databaseCheck"
									id="databaseCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="database">Database:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="database"
								name="database"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												database: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.database}
								disabled={
									!checkedFields.includes("databaseCheck") ||
									!checkedFields.includes("skillsCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2 col-span-2">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="osCheck"
									id="osCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="os">Operating System:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="os"
								name="os"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												os: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.os}
								disabled={
									!checkedFields.includes("osCheck") ||
									!checkedFields.includes("skillsCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2 col-span-3">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="fundamentalsCheck"
									id="fundamentalsCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="fundamentals">Fundamentals:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="fundamentals"
								name="fundamentals"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												fundamentals: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.fundamentals}
								disabled={
									!checkedFields.includes("fundamentalsCheck") ? "disabled" : ""
								}
							/>
						</div>
						<div className="grid grid-cols-3 gap-2 col-span-3">
							<div className="flex gap-1 col-span-1 items-center">
								<input
									className="px-3 py-2 bg-gray-800"
									type="checkbox"
									onChange={handleCheckBoxChange}
									name="othersCheck"
									id="othersCheck"
									disabled={
										!checkedFields.includes("skillsCheck") ? "disabled" : ""
									}
								/>
								<label htmlFor="other">Others:</label>
							</div>
							<input
								className="px-3 py-2 rounded-lg bg-gray-800 border col-span-2"
								type="text"
								id="other"
								name="other"
								required
								onChange={(e) => {
									setFormData((prev) => {
										return {
											...prev,
											skills: {
												...prev.skills,
												others: e.target.value,
											},
										};
									});
								}}
								value={formData?.skills?.others}
								disabled={
									!checkedFields.includes("othersCheck") ||
									!checkedFields.includes("skillsCheck")
										? "disabled"
										: ""
								}
							/>
						</div>
					</div>

					<button type="submit">Update</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateformData;
