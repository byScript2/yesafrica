import styles from "./styles.module.scss";

export default function Body({
  status,
  message,
}: {
  status: string;
  message: string;
}) {
  return (
    <div className={styles.main}>
      <div className={styles.banner}>
        <div className={styles.text}>
          {status == "1" ? (
            <h3>{`PAYMENT RECEIVED!`}</h3>
          ) : (
            <h3>{`PAYMENT FAILED!`}</h3>
          )}

          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
