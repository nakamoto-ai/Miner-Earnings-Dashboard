import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { 
  Paper, 
  Title, 
  TextInput, 
  NumberInput, 
  Button, 
  Group, 
  Text, 
  Box, 
  Container,
  Select,
  Divider,
  ActionIcon,
  Stack,
  Space,
  Alert
} from '@mantine/core';
import { IconCoin, IconUser, IconCheck, IconArrowLeft, IconTrash, IconPlus, IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { getMiners, Miner, submitEarnings } from '../utils/api'

const SubmitEarningsPage: NextPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [miners, setMiners] = useState<Miner[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMiners = async () => {
      try {
        setLoading(true);
        const data = await getMiners();
        setMiners(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching miners:', error);
        setError('Failed to load miners. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMiners();
  }, []);

  const form = useForm({
    initialValues: {
      apiKey: '',
      taoPrice: 0,
      employees: [
        { minerId: '', amount: 0}
      ],
    },
    validate: {
      apiKey: (value) => (!value ? 'API key is required' : null),
      taoPrice: (value) => (value <= 0 ? 'Tao price must be greater than 0' : null),
      employees: {
        minerId: (value) => (!value ? 'Miner selection is required' : null),
        amount: (value) => (value < 0 ? 'Amount must be greater than or equal to 0' : null),
      }
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      setError(null);
      setSubmitting(true);
      
      const earningEntries = values.employees.map(employee => ({
        people_id: parseInt(employee.minerId),
        tao_earned: employee.amount,
        tao_price: values.taoPrice
      }));
      
      const response = await submitEarnings(
        { earnings: earningEntries }, 
        values.apiKey
      );
      
      console.log('Submission successful:', response);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
        form.setValues({
          apiKey: '',
          taoPrice: 0.00,
          employees: [{ minerId: '', amount: 0 }]
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting earnings:', error);
      setError('Failed to submit earnings. Please check your API key and try again.');
    } finally {
      setSubmitting(false);
    }
  });

  const fields = form.values.employees.map((_, index) => (
    <Group key={index} align="baseline" style={{ marginBottom: "15px" }}>
      <Box style={{ flex: 1 }}>
        <Select
          label="Miner Name"
          placeholder={loading ? "Loading miners..." : "Select miner"}
          disabled={loading || submitting}
          withAsterisk
          data={miners.map(miner => ({
            value: String(miner.id),
            label: miner.name
          }))}
          {...form.getInputProps(`employees.${index}.minerId`)}
        />
      </Box>
      <Box style={{ flex: 1 }}>
        <NumberInput
          label="Tao Earned"
          placeholder="0.0000"
          disabled={loading || submitting}
          step={0.0001}
          min={0}
          withAsterisk
          {...form.getInputProps(`employees.${index}.amount`)}
        />
      </Box>
      <Box style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px', marginLeft: '10px', width: '36px', height: '36px' }}>
        {index > 0 ? (
            <ActionIcon 
              color="red" 
              onClick={() => form.removeListItem('employees', index)}
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
            SUBMIT TAO EARNINGS
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
              <Title order={3}>EARNINGS SUBMITTED!</Title>
              <Text mt="md">Tao earnings have been recorded for {form.values.employees.length} miners.</Text>
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
                <Group justify="space-between" grow>
                  <TextInput
                            label="API Key"
                            placeholder="Enter API Key"
                            withAsterisk

                            {...form.getInputProps(`apiKey`)}
                  >
                  </TextInput>
                  <NumberInput
                    label="Tao Price"
                    placeholder="420.69"
                    step={0.01}
                    min={0}
                    withAsterisk
                    {...form.getInputProps('taoPrice')}
                  />
                </Group>
                <Space h="xl"></Space>
                <Title order={3} mb="md" style={{ 
                  backgroundColor: '#e6f0f7', 
                  padding: '8px 15px', 
                  border: '2px solid #000',
                  display: 'inline-block'
                }}>
                  MINERS LIST
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
                  onClick={() => form.insertListItem('employees', { minerId: '', amount: 0 })}
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
                  {submitting ? 'Submitting...' : 'Submit All Earnings'}
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

export default SubmitEarningsPage;