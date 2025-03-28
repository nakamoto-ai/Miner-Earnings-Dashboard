import { NextPage } from 'next';
import { useState } from 'react';
import { 
  Paper, 
  Title, 
  TextInput, 
  Button, 
  Group, 
  Text, 
  Box, 
  Container,
  Stack,
  Space,
  Alert,
  ActionIcon
} from '@mantine/core';
import { IconCheck, IconArrowLeft, IconTrash, IconPlus, IconAlertCircle, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { addPeople } from '../utils/api';

const AddMinersPage: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      apiKey: '',
      miners: [
        { name: '' }
      ],
    },
    validate: {
      apiKey: (value) => (!value ? 'API key is required' : null),
      miners: {
        name: (value) => (!value ? 'Miner name is required' : null),
      }
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      setError(null);
      setSubmitting(true);
      
      const peopleList = {
        people: values.miners.map(miner => ({
          name: miner.name.trim()
        }))
      };
      
      const response = await addPeople(peopleList, values.apiKey);
      
      console.log('Submission successful:', response);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
        form.setValues({
          apiKey: '',
          miners: [{ name: '' }]
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error adding miners:', error);
      setError('Failed to add miners. Please check your API key and try again.');
    } finally {
      setSubmitting(false);
    }
  });

  const fields = form.values.miners.map((_, index) => (
    <Group key={index} align="baseline" style={{ marginBottom: "15px" }}>
      <Box style={{ flex: 1 }}>
        <TextInput
          label="Miner Name"
          placeholder="Enter miner's name"
          disabled={submitting}
          withAsterisk
          {...form.getInputProps(`miners.${index}.name`)}
        />
      </Box>
      <Box style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px', marginLeft: '10px', width: '36px', height: '36px' }}>
        {index > 0 ? (
            <ActionIcon 
              color="red" 
              onClick={() => form.removeListItem('miners', index)}
              style={{ 
                border: '2px solid #000',
                borderRadius: '4px'
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
        ) : null}
      </Box>
    </Group>
  ));

  return (
    <Container size="md" py="xl">
      <Box mb="xl" style={{ textAlign: 'center' }}>
        <Title order={1} style={{ 
          display: 'inline-block',
          backgroundColor: '#ffd70c', 
          padding: '10px 15px', 
          border: '3px solid #000',
          transform: 'rotate(-1deg)',
          marginBottom: '10px',
          boxShadow: '4px 4px 0 #000',
        }}>
          ADD NEW MINERS
        </Title>
      </Box>
      
      <Paper 
        p="xl" 
        withBorder 
        shadow="sm"
      >
        {submitted ? (
          <Box 
            style={{ 
              textAlign: 'center', 
              padding: '30px',
              backgroundColor: '#c3ffc3',
              border: '2px solid #000',
              marginBottom: '20px',
            }}
          >
            <IconCheck size={48} style={{ color: 'green', marginBottom: '10px' }} />
            <Title order={3}>MINERS ADDED!</Title>
            <Text mt="md">{form.values.miners.length} new miners have been added to the system.</Text>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert 
                icon={<IconAlertCircle size={16} />} 
                title="Error" 
                color="red" 
                mb="md"
                style={{
                  border: '2px solid #ff0000',
                }}
              >
                {error}
              </Alert>
            )}
            
            <TextInput
              label="API Key"
              placeholder="Enter API Key"
              withAsterisk
              {...form.getInputProps(`apiKey`)}
            />
            
            <Space h="xl"></Space>
            <Title order={3} mb="md" style={{ 
              backgroundColor: '#e6f0f7', 
              padding: '8px 15px', 
              border: '2px solid #000',
              display: 'inline-block'
            }}>
              NEW MINERS
            </Title>
          
            <Stack>
              <Box 
                style={{ 
                  position: 'relative',
                  border: '2px solid #000',
                  padding: '15px',
                  marginBottom: '20px',
                  backgroundColor: '#f8f8f8'
                }}
              >
                {fields}
              </Box>
              
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() => form.insertListItem('miners', { name: '' })}
                style={{
                  backgroundColor: '#90EE90',
                  color: 'black',
                  border: '2px solid #000',
                  fontWeight: 700,
                  alignSelf: 'flex-start',
                }}
              >
                Add Another Miner
              </Button>
            </Stack>
            
            <Group justify="center" mt="xl">
              <Button
                type="submit"
                size="lg"
                loading={submitting}
                leftSection={<IconUserPlus size={18} />}
                style={{
                  backgroundColor: '#0091ff',
                  border: '3px solid #000',
                  boxShadow: '4px 4px 0 #000',
                  fontWeight: 700,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  padding: '0 30px',
                }}
              >
                {submitting ? 'Adding Miners...' : 'Add Miners'}
              </Button>
            </Group>
          </form>
        )}
        
        <Space h="xl"></Space>

        <Group justify="center">
          <Button
            component={Link}
            href="/"
            variant="outline"
            leftSection={<IconArrowLeft size={18} />}
            style={{
              border: '2px solid #000',
              fontWeight: 700,
            }}
          >
            Back to Dashboard
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default AddMinersPage;