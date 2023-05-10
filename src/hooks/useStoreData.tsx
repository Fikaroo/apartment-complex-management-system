import React, { useEffect } from "react";
import useSWR from "swr";
interface IUseStoreData {
  path: string;
  fetcher: any;
  storeFunc: any;
}

const useStoreData = ({ path, fetcher, storeFunc }: IUseStoreData) => {
  console.log(path, fetcher, storeFunc);
  const { data, isLoading, error } = useSWR(path, fetcher);

  useEffect(() => {
    isLoading ? null : error ? null : storeFunc(data?.data);
  }, [data]);

  return { data };
};

export default useStoreData;
