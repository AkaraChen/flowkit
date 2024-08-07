import { FC, PropsWithChildren } from "react";

export const NodeLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="p-4 shadow border-zinc-200 border rounded-lg">
            {children}
        </div>
    );
};
