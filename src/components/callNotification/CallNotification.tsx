import { IOngoingCall } from "@/types/types";
import { MdCallEnd, MdCall } from "react-icons/md";

type Props = {
  ongoingCall: IOngoingCall | null;
  handleJoinCall: (ongoingCall: IOngoingCall) => void;
};

function CallNotification({ ongoingCall, handleJoinCall }: Props) {
  if (!ongoingCall?.isRinging) return;
  return (
    <div className="absolute bg-slate-500/70 w-full h-full top-0 bottom-0 flex items-center justify-center ">
      <div className="bg-white min-w-[300px] min-h-[100px] flex flex-col items-center justify-center rounded p-4">
        <div className="flex flex-col items-center">
          <span>{ongoingCall.participants.caller.userName}</span>
        </div>
        <p className="text-sm mb-2">Incoming Call</p>
        <div className="flex gap-8">
          <button
            onClick={() => handleJoinCall(ongoingCall)}
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white cursor-pointer"
          >
            <MdCall size={24} />
          </button>
          <button className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white cursor-pointer">
            <MdCallEnd size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallNotification;
