export const DashboardPage = () => {
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    content: {
      fontSize: '16px',
      color: '#333',
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dashboard</h1>
      <div style={styles.content}>
        <p>Welcome to the dashboard!</p>
      </div>
    </div>
  );
};
