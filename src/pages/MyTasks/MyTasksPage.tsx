// import { gql } from '@apollo/client';
// import { useQuery } from '@apollo/client/react';

export const MyTasksPage = () => {
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

  // const GET_MY_TASKS = gql`
  //   query GetMyTasks {
  //     tasks(input: { assigneeId: "2c69a930-16ed-41c0-afb3-a7564471d307" }) {
  //       id
  //       name
  //       status
  //       pointEstimate
  //       position
  //       dueDate
  //       creator {
  //         id
  //         fullName
  //         avatar
  //       }
  //       assignee {
  //         id
  //         fullName
  //         avatar
  //       }
  //       tags
  //     }
  //   }
  // `;

  // const { data, loading, error } = useQuery(GET_MY_TASKS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  // if (data) {
  //   console.log('Fetched users:', data);
  // }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Tasks</h1>
      <div style={styles.content}>
        <p>Here are your tasks!</p>
      </div>
    </div>
  );
};
