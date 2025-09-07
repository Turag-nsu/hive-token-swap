'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Send, User, Coins, MessageSquare, AlertTriangle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useWalletData } from '@/hooks/useWalletData';
import { useWalletOperations } from '@/hooks/useWalletOperations';
import { useNotification } from '@/providers/NotificationProvider';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';

interface SendTokensProps {
  className?: string;
}

export function SendTokens({ className }: SendTokensProps) {
  const { user, isConnected } = useWallet();
  const { balances } = useWalletData(user?.name || '', isConnected ? 'keychain' : null);
  const { transfer } = useWalletOperations();
  const { success: successNotification, error: errorNotification } = useNotification();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'HIVE' | 'HBD'>('HIVE');
  const [memo, setMemo] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setError(null);
    
    // Validate recipient
    if (!recipient) {
      setError('Recipient username is required');
      return;
    }
    
    // Validate recipient format (basic Hive username validation)
    if (!/^[a-z0-9][a-z0-9\-\.]{1,14}[a-z0-9]$/.test(recipient)) {
      setError('Invalid recipient username format');
      return;
    }
    
    // Validate amount
    if (!amount) {
      setError('Amount is required');
      return;
    }
    
    // Validate amount is a positive number
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    
    // Validate user and connection
    if (!user || !isConnected) {
      setError('Wallet not connected. Please connect your wallet first.');
      return;
    }
    
    // Validate sufficient balance
    if (balances) {
      let balanceStr = '';
      switch (currency) {
        case 'HIVE':
          balanceStr = balances.hive;
          break;
        case 'HBD':
          balanceStr = balances.hbd;
          break;
        default:
          balanceStr = '0.000 HIVE';
      }
      
      const balanceNum = parseFloat(balanceStr.split(' ')[0] || '0');
      if (amountNum > balanceNum) {
        setError(`Insufficient ${currency} balance. Available: ${balanceStr}`);
        return;
      }
    }
    
    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const confirmAndSend = async () => {
    setIsTransferring(true);
    setShowConfirmation(false);
    
    try {
      const result = await transfer(
        {
          username: user?.name || '',
          to: recipient,
          amount: amount,
          currency,
          memo
        },
        isConnected ? 'keychain' : null
      );
      
      if (result?.success) {
        successNotification(`Successfully sent ${amount} ${currency} to @${recipient}`);
        // Reset form after successful transfer
        setRecipient('');
        setAmount('');
        setMemo('');
      } else {
        throw new Error(result?.message || 'Transfer failed');
      }
    } catch (err) {
      console.error('Transfer failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Transfer failed';
      setError(errorMessage);
      errorNotification(errorMessage);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-blue-500" />
            Send Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Recipient</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="recipient"
                  placeholder="Enter Hive username"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value.trim())}
                  className={`pl-10 ${error && error.includes('Recipient') ? 'border-red-500' : ''}`}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount</label>
                <div className="relative">
                  <Coins className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.001"
                    min="0.001"
                    placeholder="0.000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`pl-10 ${error && error.includes('Amount') ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="currency" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Currency</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'HIVE' | 'HBD')}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="HIVE">HIVE</option>
                  <option value="HBD">HBD</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="memo" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Memo (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="memo"
                  placeholder="Add a memo to your transfer"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="pl-10"
                  rows={3}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isTransferring || !recipient || !amount || !user || !isConnected}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isTransferring ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Tokens
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Modal open={showConfirmation} onOpenChange={setShowConfirmation}>
        <ModalContent className="sm:max-w-md">
          <ModalHeader>
            <ModalTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Confirm Transaction
            </ModalTitle>
            <ModalDescription>
              Please review the transaction details before sending.
            </ModalDescription>
          </ModalHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Recipient</p>
                <p className="font-medium">@{recipient}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">{amount} {currency}</p>
              </div>
            </div>
            {memo && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Memo</p>
                <p className="font-medium break-words">{memo}</p>
              </div>
            )}
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This action cannot be undone. Please ensure all details are correct.
              </AlertDescription>
            </Alert>
          </div>
          <ModalFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isTransferring}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAndSend}
              disabled={isTransferring}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isTransferring ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Sending...
                </>
              ) : (
                'Confirm and Send'
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}