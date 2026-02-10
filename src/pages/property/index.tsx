import { useParams } from "react-router";

export default function Property() {
  let { propertyId } = useParams();
  return (
    <h1 className="text-2xl font-bold">
      This is property page with property id: {propertyId}
    </h1>
  );
}
