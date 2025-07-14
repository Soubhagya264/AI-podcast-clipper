"use client";

import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateUploadUrl } from "@/actions/s3";
import { processVideo } from "@/actions/generation";
import {
    UploadCloud,
    CheckCircle2,
    XCircle,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ClipDisplay } from "./ClipDisplay";

export default function UploadClient({
    uploadedFiles,
    clips,
}: {
    uploadedFiles: {
        id: string;
        s3Key: string;
        filename: string;
        status: string;
        clipsCount: number;
        createdAt: Date;
    }[];
    clips: any[];
}) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "video/mp4": [".mp4"],
            "video/webm": [".webm"]
         },
        maxFiles: 1,
        maxSize: 700 * 1024 * 1024,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setStatus("idle");
            setProgress(0);
        },
    });

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus("idle");
        setProgress(0);

        try {
            const { success, signedUrl, uploadedFileId } = await generateUploadUrl({
                filename: file.name,
                contentType: file.type,
            });

            if (!success) throw new Error("Failed to get upload URL");

            await axios.put(signedUrl, file, {
                headers: { "Content-Type": file.type },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setProgress(percent);
                },
            });

            await processVideo(uploadedFileId);

            toast.success("Uploaded!", {
                description: "Your podcast is processing 🎉",
            });

            setStatus("success");
            router.refresh();
            setFile(null);
        } catch (err) {
            console.error(err);
            toast.error("Upload failed", {
                description: "Please try again!",
            });
            setStatus("error");
        } finally {
            setUploading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        router.refresh();
        setTimeout(() => setRefreshing(false), 600);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
                    Upload Your Podcast 🎙️
                </h1>
                <p className="mt-2 text-white/70">
                    Get stunning AI-generated clips instantly
                </p>
            </div>

            <Tabs defaultValue="upload">
                <TabsList>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="my-clips">My Clips</TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                    <Card className="bg-white/5 border border-white/20 backdrop-blur-lg shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-white">Upload Podcast</CardTitle>
                            <CardDescription className="text-white/70">
                                Drag & drop your file to generate clips.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                {...getRootProps()}
                                className={`flex flex-col items-center justify-center space-y-4 rounded-lg p-10 text-center border-2 border-dashed cursor-pointer transition ${isDragActive
                                        ? "border-blue-500 bg-white/10"
                                        : "border-white/30 bg-white/5"
                                    }`}
                            >
                                <input {...getInputProps()} />
                                <UploadCloud className="h-12 w-12 text-white" />
                                <p className="font-medium text-white">
                                    Drag & drop or click to select
                                </p>
                                <p className="text-sm text-white/70">MP4 up to 700MB</p>
                            </div>

                            {file && (
                                <div className="mt-4 text-white/80">
                                    <p>Selected: {file.name}</p>

                                    <motion.div
                                        className="relative h-4 w-full bg-white/20 rounded-full overflow-hidden mt-2"
                                        initial={false}
                                    >
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                            style={{ width: `${progress}%` }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </motion.div>

                                    <div className="flex items-center gap-2 mt-2">
                                        {status === "success" && (
                                            <CheckCircle2 className="text-green-500" />
                                        )}
                                        {status === "error" && (
                                            <XCircle className="text-red-500" />
                                        )}
                                        {uploading && (
                                            <Loader2 className="animate-spin text-blue-500" />
                                        )}
                                        <span className="text-sm text-white/70">
                                            {status === "success" && "Upload complete!"}
                                            {status === "error" && "Upload failed"}
                                            {uploading && `${progress}%`}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex justify-end">
                                <Button
                                    disabled={!file || uploading}
                                    onClick={handleUpload}
                                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 text-white"
                                >
                                    Upload & Generate
                                </Button>
                            </div>

                            {uploadedFiles.length > 0 && (
                                <div className="pt-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h3 className="text-md mb-2 font-medium text-white">
                                            Queue status
                                        </h3>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRefresh}
                                            disabled={refreshing}
                                        >
                                            {refreshing && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Refresh
                                        </Button>
                                    </div>
                                    <div className="max-h-[300px] overflow-auto rounded-md border border-white/20">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-white">File</TableHead>
                                                    <TableHead className="text-white">Uploaded</TableHead>
                                                    <TableHead className="text-white">Status</TableHead>
                                                    <TableHead className="text-white">Clips</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {uploadedFiles.map((item) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell className="max-w-xs truncate font-medium text-white">
                                                            {item.filename}
                                                        </TableCell>
                                                        <TableCell className="text-white/70 text-sm">
                                                            {new Date(item.createdAt).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.status === "queued" && (
                                                                <Badge variant="outline">Queued</Badge>
                                                            )}
                                                            {item.status === "processing" && (
                                                                <Badge variant="outline">Processing</Badge>
                                                            )}
                                                            {item.status === "processed" && (
                                                                <Badge variant="outline">Processed</Badge>
                                                            )}
                                                            {item.status === "no credits" && (
                                                                <Badge variant="destructive">No credits</Badge>
                                                            )}
                                                            {item.status === "failed" && (
                                                                <Badge variant="destructive">Failed</Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-white/80">
                                                            {item.clipsCount > 0 ? (
                                                                <span>
                                                                    {item.clipsCount} clip
                                                                    {item.clipsCount !== 1 ? "s" : ""}
                                                                </span>
                                                            ) : (
                                                                <span className="text-white/40">
                                                                    No clips yet
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="my-clips" className="mt-6">
                    <Card className="bg-white/5 border border-white/20 backdrop-blur-lg shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-white">My Clips</CardTitle>
                            <CardDescription className="text-white/70">
                                Manage your generated clips here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ClipDisplay clips={clips} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
