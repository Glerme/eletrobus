import { useState } from "react";

import { IStatus } from "~/interfaces/Status.interface";

export const useAllStatus = () => {
  const [allStatus, setAllStatus] = useState<IStatus[] | null>(null);

  return { allStatus, setAllStatus };
};
