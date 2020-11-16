import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

type BomModalProps = {
  name: string;
  fylke: string;
  kommune: string;
  truckPrice: number;
  carPrice: number;
};

const BomModal: React.FC<BomModalProps> = (props: BomModalProps) => {
  return (
    <Modal>
      <Text>Hey!</Text>
    </Modal>
  );
};

export default BomModal;
