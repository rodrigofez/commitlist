import { Handle, Position } from 'reactflow';

const colors = [
  { bg: 'bg-blue-100', border: 'border-blue-500' },
  { bg: 'bg-red-100', border: 'border-red-500' },
  { bg: 'bg-green-100', border: 'border-green-500' },
  { bg: 'bg-pink-100', border: 'border-pink-500' },
  { bg: 'bg-rose-100', border: 'border-rose-500' },
  { bg: 'bg-indigo-100', border: 'border-indigo-500' },
  { bg: 'bg-purple-100', border: 'border-purple-500' },
  { bg: 'bg-fuchsia-100', border: 'border-fuchsia-500' },
  { bg: 'bg-violet-100', border: 'border-violet-500' },
  { bg: 'bg-cyan-100', border: 'border-cyan-500' },
];

const getOrder = (order: number): number => order - Math.floor(order / 10) * 10;

export function CommitNode({
  data,
  isConnectable,
}: {
  data: { order: number; label: string; avatar: string; branch: string };
  isConnectable: boolean;
}) {
  const order = getOrder(data.order);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="relative">
        <img
          className={`w-8 h-8 rounded-full border-1 ${colors[order].border}`}
          src={data.avatar}
        />
        <div
          style={{ width: `500px` }}
          className="shadow-sm absolute w-screen h-8 top-0 -z-10 bg-gray-50 rounded-r-sm left-4 flex place-items-center"
        >
          <div
            title={data.branch}
            style={{ width: `200px` }}
            className={`relative flex items-center h-full ${colors[order].bg} flex-none border-r-2 ${colors[order].border} -z-50`}
          >
            <div className="right-2 absolute text-sm truncate text-ellipsis w-36 text-right">
              {data.branch}
            </div>
          </div>
          <div
            title={data.label}
            className="pl-3 text-sm text-ellipsis truncate"
          >
            {data.label}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
