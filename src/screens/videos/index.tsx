"use client";
import Loader from "@/shared-components/loader";
import "./index.css";
import { SharedComp } from "@/shared-components/modulesAndVideo";

const VideosScreen = ({
  data,
  type,
  loading,
}: {
  data: any;
  type: string;
  loading?: boolean;
}) => {
  return (
    <>
      <div className="container-fluid">
        <section className="videoOperation">
          <div>
            {
              type === 'videos' && <h1 className="videoInfoCont mb-5">Video modules</h1>
            }

          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="row">
              <SharedComp type={type} data={data} />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default VideosScreen;
