import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { GetDataUploadByAdminRequest } from "../../../Services/SuperAdminRequest/datareport.request";

const AdminUpload = () => {
  const { auth } = useAuth();
  const token = auth.accessToken;

  // React Tanstack Query for data fetching logic
  const { data: adminUploadData } = useQuery({
    queryKey: ["getUploadByAdminApi"],
    queryFn: () => GetDataUploadByAdminRequest(token),
  });

  return (
    <>
      <div>
        <p className="text-[14px] font-semibold md:text-[16px]">
          Uploads by admins
        </p>

        <div className="max-h-[190px] overflow-scroll">
          {adminUploadData?.data?.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 border-t-[0.5px] border-slate-300 overflow-scroll p-3 my-3"
            >
              <p className="text-[12px]">{item.email}</p>
              <p className="text-[12px]">{item.totalCaseUploads}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUpload;
