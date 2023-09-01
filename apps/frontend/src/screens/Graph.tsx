import ReactFlow, { Background, Controls } from 'reactflow';

import 'reactflow/dist/style.css';

import { CommitNode } from '../components/CommitNode';
import Error from '../components/Error';
import { useGraph } from '../hooks/useGraph';

const nodeTypes = { textUpdater: CommitNode };

export const Graph = () => {
  const { initialEdges, initialNodes, isLoading, isSuccess, isError } =
    useGraph();

  return (
    <div className="m-4 flex flex-col items-start gap-2">
      {isLoading && (
        <div className="h-screen w-full  rounded-md bg-gray-200 opacity-80 animate-pulse" />
      )}
      {isError && <Error>There was an error retrieving commits</Error>}
      {isSuccess && (
        <div className="rounded-lg overflow-hidden border-1 left-0 w-full h-screen">
          <ReactFlow
            style={{ width: '100%' }}
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            nodesConnectable={false}
          >
            <Background color="#aaa" gap={16} />
            <Controls
              style={{ backgroundColor: 'white' }}
              position="top-right"
              showInteractive={false}
            />
          </ReactFlow>
        </div>
      )}
    </div>
  );
};
