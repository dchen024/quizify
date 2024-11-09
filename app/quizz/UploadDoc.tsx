"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const UploadDoc = () => {
    const [document, setDocument] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!document) {
            setError("Please select a document to generate quiz");
            return;
        }
        setIsLoading(true);
        console.log(document)
        const formData = new FormData();
        formData.append("pdf", document as Blob);

        try {
            const res = await fetch("/api/quizz/generate", {
                method: "POST",
                body: formData,
            });
            if (res.status === 200){
                console.log("quizz generated successfully")
            }
        } catch (e) {
            console.log("error", e);
        }
        setIsLoading(false);
        }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
                <label htmlFor="document" className="mb-4 bg-secondary w-full flex
                h-20 rounded-md border-4 border-dashed border-blue-900 relative">
                    <div className="absolute inset-0 m-auto
                    flex justify-center items-center">
                        {document && document?.name ? document.name : "Drag and drop your document here"}
                    </div>
                    <input
                        type="file"
                        id="document"
                        className="relative block w-full h-full z-50 opacity-0"
                        onChange={(e) => setDocument(e.target.files?.[0] || null)}
                    />
                </label>
                {error && <p className="text-red-600">{error}</p>}
                <Button type="submit" size="lg" className="mt-2" disabled={isLoading}>
                    {"Generate Quiz"}
                </Button>
            </form>
        </div>
    );
};

export default UploadDoc;