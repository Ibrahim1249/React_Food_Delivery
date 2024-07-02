import Skeleton from "@mui/material/Skeleton";

function SkeletonLayout() {
  return (
    <>
      <div style={{ marginBottom: "20px" }}>
         <Skeleton variant="rectangle" width="100%" height={118} />
         <Skeleton width="60%" />
         <Skeleton width="80%" />
      </div>
    </>
  )
}

export default SkeletonLayout