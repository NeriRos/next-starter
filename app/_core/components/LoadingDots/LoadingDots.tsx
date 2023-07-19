import styles from "./LoadingDots.module.css"

export const LoadingDots = ({ color = "#000" }: { color?: string }) => {
    return (<span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>)
}