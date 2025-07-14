import { getUserUploadData } from "../../actions/UserUploadData";
import SidebarContent from "./SidebarContent";
export default async function DashboardPage() {
  const { user, files } = await getUserUploadData();
  return (
    <SidebarContent user={user} files={files} />
  );
}