import React from "react";
import { useToast } from "react-native-toast-notifications";
import { StyleSheet } from "react-native";
import { getData, postData } from "../configs/apis";
import { SPACING_VERTICAL } from "../constants/spacing";
import {
  ADD_TO_COMPARED_LIST_ENDPOINT_URL,
  ADD_TO_WISH_LIST_ENDPOINT_URL,
  GET_COMPARED_LIST_PRODUCT_ENDPOINT_URL,
  GET_WISH_LIST_PRODUCT_ENDPOINT_URL,
} from "../constants/urls";
import { Button } from "./Button";
import { Loading } from "./Loading";

interface Props {
  productID: number;
}

export const AddToWishListComparedList: React.FC<Props> = ({ productID }) => {
  const toast = useToast();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [productExistsInWishList, setProductExistsInWishList] =
    React.useState<boolean>(false);
  const [productExistsInComList, setProductExistsInComList] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const wishRes = await getData(
          GET_WISH_LIST_PRODUCT_ENDPOINT_URL,
          productID,
          { token: "test", time_zone: "EEST" },
        );

        const comRes = await getData(
          GET_COMPARED_LIST_PRODUCT_ENDPOINT_URL,
          productID,
          { token: "test", time_zone: "EEST" },
        );

        if (wishRes?.data?.message === "We couldn't found anything.")
          setProductExistsInWishList(false);
        else setProductExistsInWishList(true);

        if (comRes?.data?.message === "We couldn't found anything.")
          setProductExistsInComList(false);
        else setProductExistsInComList(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addToWishList = async () => {
    try {
      setLoading(true);
      const response = await postData(ADD_TO_WISH_LIST_ENDPOINT_URL, {
        product_id: productID,
      });
      toast.show(response.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToComparedList = async () => {
    try {
      setLoading(true);
      const response = await postData(ADD_TO_COMPARED_LIST_ENDPOINT_URL, {
        product_id: productID,
      });
      toast.show(response.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading /> : null}

      <Button
        title={`${
          productExistsInWishList ? "Remove from" : "Add to"
        }  wish list`}
        containerStyle={styles.addToWishList}
        onPress={addToWishList}
      />
      <Button
        title={`${
          productExistsInComList ? "Remove from" : "Add to"
        } compared list`}
        containerStyle={styles.addToWishList}
        onPress={addToComparedList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addToWishList: {
    marginVertical: SPACING_VERTICAL,
    alignSelf: "center",
  },
});
