import Connex from "@vechain/connex";
import { Certificate } from "thor-devkit";
import { useState } from "react";
import { Row, Col, Descriptions, Button } from "antd";

const connex = new Connex({
  node: "https://testnet.veblocks.net",
  network: "test"
});

export default function App() {
  const [message, setMessage] = useState();
  const [certificate] = useState({
    purpose: "identification",
    payload: {
      type: "text",
      content: "content to sign"
    }
  });
  const [verified, setVerified] = useState();

  const handleSigning = async () => {
    try {
      const signedMessage = await connex.vendor
        .sign("cert", certificate)
        .request();

      verifySignature({
        ...certificate,
        ...signedMessage.annex,
        signature: signedMessage.signature
      });

      setMessage(signedMessage);
    } catch (err) {}
  };

  const verifySignature = async (signedCertificate) => {
    try {
      Certificate.verify(signedCertificate);
      setVerified("yes");
    } catch (err) {
      console.log(err);
      setVerified(err.message);
    }
  };

  return (
    <Row gutter={[32, 32]}>
      <Col span={24} />
      <Col
        xs={{ span: 22, offset: 1 }}
        xl={{ span: 12, offset: 6 }}
        align="center"
      >
        <Button onClick={handleSigning}>
          identify by signing the certificate
        </Button>
      </Col>
      <Col xs={{ span: 22, offset: 1 }} xl={{ span: 12, offset: 6 }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="raw certificate">
            <pre>{JSON.stringify(certificate, "", 2)}</pre>
          </Descriptions.Item>
          <Descriptions.Item label="signed certificate">
            <pre>{JSON.stringify(message, "", 2)}</pre>
          </Descriptions.Item>
          <Descriptions.Item label="signer address">
            {message?.annex?.signer}
          </Descriptions.Item>
          <Descriptions.Item label="verified">{verified}</Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}
