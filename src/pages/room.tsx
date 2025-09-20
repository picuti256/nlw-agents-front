import { Navigate, useParams } from "react-router-dom";

type RoomsParams = {
  roomsId: string;
};

export function Room() {
  const params = useParams<RoomsParams>();

  if (!params.roomsId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      <h1>Room details {JSON.stringify(params.roomsId)}</h1>
    </div>
  );
}
