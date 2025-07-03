import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';

export const VoiceBankingPage: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceHistory, setVoiceHistory] = useState([
    {
      id: '1',
      command: 'Check my balance',
      response: 'Your current savings balance is ₦25,000',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      success: true
    },
    {
      id: '2',
      command: 'Pay MTN airtime 500 naira',
      response: 'Airtime payment of ₦500 to MTN was successful',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      success: true
    }
  ]);

  const recognition = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        processVoiceCommand(speechResult);
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setResponse('Sorry, I couldn\'t understand that. Please try again.');
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      recognition.current.start();
    } else {
      setResponse('Voice recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const lowerCommand = command.toLowerCase();
      let responseText = '';
      let success = true;

      if (lowerCommand.includes('balance') || lowerCommand.includes('how much')) {
        responseText = 'Your current savings balance is ₦25,000. Your emergency fund has ₦5,000.';
      } else if (lowerCommand.includes('pay') && lowerCommand.includes('airtime')) {
        const match = lowerCommand.match(/(\d+)/);
        const amount = match ? match[1] : '100';
        responseText = `Airtime payment of ₦${amount} was successful. Your new balance is ₦${25000 - parseInt(amount)}.`;
      } else if (lowerCommand.includes('transfer') || lowerCommand.includes('send money')) {
        responseText = 'To transfer money, please specify the amount and recipient. For security, large transfers require PIN confirmation.';
      } else if (lowerCommand.includes('save') || lowerCommand.includes('deposit')) {
        const match = lowerCommand.match(/(\d+)/);
        const amount = match ? match[1] : '1000';
        responseText = `₦${amount} has been added to your savings goal. Great job staying on track!`;
      } else if (lowerCommand.includes('goal') || lowerCommand.includes('progress')) {
        responseText = 'Your School Fees goal is 50% complete. You have ₦25,000 saved of your ₦50,000 target.';
      } else if (lowerCommand.includes('transaction') || lowerCommand.includes('history')) {
        responseText = 'Your last transaction was a ₦500 airtime purchase yesterday. Would you like to hear more recent transactions?';
      } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
        responseText = 'I can help you check balances, make payments, transfer money, check savings goals, and review transactions. Just speak naturally!';
      } else {
        responseText = 'I didn\'t understand that command. Try saying "check balance", "pay airtime", "transfer money", or "help" for assistance.';
        success = false;
      }

      setResponse(responseText);
      setIsProcessing(false);

      // Add to history
      const newCommand = {
        id: Date.now().toString(),
        command,
        response: responseText,
        timestamp: new Date().toISOString(),
        success
      };
      setVoiceHistory(prev => [newCommand, ...prev]);

      // Speak the response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(responseText);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const quickCommands = [
    { text: 'Check my balance', icon: 'savings', color: '#228B22' },
    { text: 'Pay 500 naira airtime', icon: 'bills', color: '#FF4040' },
    { text: 'Save 1000 naira', icon: 'goals', color: '#FFD700' },
    { text: 'Check my goals', icon: 'budgeting', color: '#87CEEB' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#228B22] to-[#2EA62E] text-white">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="profile" color="white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Voice Banking</h2>
            <p className="text-sm opacity-90">Control your finances with voice commands</p>
          </div>
        </div>
      </Card>

      {/* Voice Interface */}
      <Card>
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 ${
            isListening ? 'bg-red-100 animate-pulse' : 'bg-blue-100'
          }`}>
            <Icon 
              name="profile" 
              size={48} 
              color={isListening ? '#FF4040' : '#87CEEB'} 
            />
          </div>

          <h3 className="text-lg font-medium mb-2">
            {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Tap to speak'}
          </h3>

          {transcript && (
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-800">You said: "{transcript}"</p>
            </div>
          )}

          {response && (
            <div className="bg-blue-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">{response}</p>
            </div>
          )}

          <Button
            className={`w-40 h-12 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
          >
            {isListening ? 'Stop' : isProcessing ? 'Processing...' : 'Start Voice'}
          </Button>
        </div>
      </Card>

      {/* Quick Commands */}
      <div>
        <h3 className="font-medium mb-3">Quick Commands</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickCommands.map((command, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto text-center"
              onClick={() => processVoiceCommand(command.text)}
            >
              <Icon name={command.icon as any} color={command.color} size={24} className="mb-2" />
              <span className="text-sm">{command.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Voice Commands Guide */}
      <Card>
        <h3 className="font-medium mb-3">Voice Commands Guide</h3>
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium text-gray-800">Balance & Account Info</h4>
            <p className="text-gray-600">• "Check my balance"</p>
            <p className="text-gray-600">• "How much money do I have?"</p>
            <p className="text-gray-600">• "What's my emergency fund balance?"</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800">Payments</h4>
            <p className="text-gray-600">• "Pay 500 naira MTN airtime"</p>
            <p className="text-gray-600">• "Buy 1000 airtime"</p>
            <p className="text-gray-600">• "Send money to John"</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800">Savings & Goals</h4>
            <p className="text-gray-600">• "Save 2000 naira"</p>
            <p className="text-gray-600">• "Check my savings goals"</p>
            <p className="text-gray-600">• "How is my school fees goal?"</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800">Transactions</h4>
            <p className="text-gray-600">• "Show my recent transactions"</p>
            <p className="text-gray-600">• "What did I spend yesterday?"</p>
            <p className="text-gray-600">• "Transaction history"</p>
          </div>
        </div>
      </Card>

      {/* Voice History */}
      <div>
        <h3 className="font-medium mb-3">Recent Voice Commands</h3>
        <div className="space-y-2">
          {voiceHistory.slice(0, 5).map((item) => (
            <Card key={item.id} className="text-sm">
              <div className="flex items-start">
                <div className={`w-2 h-2 rounded-full mr-3 mt-2 ${
                  item.success ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">"{item.command}"</p>
                      <p className="text-gray-600 mt-1">{item.response}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Accessibility Settings */}
      <Card variant="elevated" className="bg-green-50 border-l-4 border-green-500">
        <div className="flex">
          <div className="mr-3">
            <Icon name="profile" color="#228B22" />
          </div>
          <div>
            <h4 className="font-medium mb-2">Accessibility Features</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Voice Feedback</span>
                <Badge text="Enabled" variant="success" size="xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>Large Text Mode</span>
                <Badge text="Disabled" variant="secondary" size="xs" />
              </div>
              <div className="flex items-center justify-between">
                <span>High Contrast</span>
                <Badge text="Disabled" variant="secondary" size="xs" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3">
              Customize Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* Security Notice */}
      <Card variant="elevated" className="bg-yellow-50 border-l-4 border-yellow-500">
        <div className="flex">
          <div className="mr-3">
            <Icon name="notifications" color="#FFD700" />
          </div>
          <div>
            <h4 className="font-medium mb-2">Security & Privacy</h4>
            <p className="text-sm text-gray-700 mb-3">
              Voice commands are processed locally and require PIN verification for sensitive operations like large transfers.
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Transfers above ₦5,000 require PIN confirmation</li>
              <li>• Voice data is not stored permanently</li>
              <li>• Use in private locations for security</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
