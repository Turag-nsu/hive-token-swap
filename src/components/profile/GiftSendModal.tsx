"use client";

import { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalTitle, 
  ModalDescription 
} from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { FuturisticButton } from '@/components/ui/FuturisticButton';
import { useWalletOperations } from '@/hooks/useWalletOperations';
import { useUser } from '@/hooks/useUser';
import { UserProfile } from '@/types/social';
import { Gift, Coins, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/providers/ThemeProvider';

interface GiftSendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient: UserProfile;
}

export function GiftSendModal({ open, onOpenChange, recipient }: GiftSendModalProps) {
  const { username } = useUser();
  const { computedTheme } = useTheme();
  const { transfer } = useWalletOperations();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'HIVE' | 'HBD'>('HIVE');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSendGift = async () => {
    if (!username) {
      toast.error('You must be logged in to send gifts');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const result = await transfer(
        {
          username,
          to: recipient.username,
          amount,
          currency,
          memo: message || `Gift from @${username}`
        },
        'keychain' // Assuming keychain for now
      );

      if (result.success) {
        toast.success(`Gift sent successfully to @${recipient.username}!`);
        onOpenChange(false);
        // Reset form
        setAmount('');
        setMessage('');
      } else {
        throw new Error(result.message || 'Failed to send gift');
      }
    } catch (err) {
      console.error('Error sending gift:', err);
      setError(err.message || 'Failed to send gift. Please try again.');
      toast.error('Failed to send gift. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCurrencyChange = (newCurrency: 'HIVE' | 'HBD') => {
    setCurrency(newCurrency);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className={`max-w-md glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
        <ModalHeader>
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-primary" />
            <ModalTitle className="font-futuristic">Send Gift to @{recipient.username}</ModalTitle>
          </div>
          <ModalDescription>
            Send HIVE or HBD as a gift to @{recipient.username}
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4 py-4">
          {/* Token Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block font-futuristic">Select Token</label>
            <div className="grid grid-cols-2 gap-2">
              <FuturisticButton
                variant={currency === 'HIVE' ? 'primary' : 'outline'}
                onClick={() => handleCurrencyChange('HIVE')}
                className="flex items-center justify-center space-x-2"
              >
                <Coins className="w-4 h-4" />
                <span>HIVE</span>
              </FuturisticButton>
              <FuturisticButton
                variant={currency === 'HBD' ? 'primary' : 'outline'}
                onClick={() => handleCurrencyChange('HBD')}
                className="flex items-center justify-center space-x-2"
              >
                <Coins className="w-4 h-4" />
                <span>HBD</span>
              </FuturisticButton>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="text-sm font-medium mb-2 block font-futuristic">
              Amount ({currency})
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="0.000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.001"
              min="0"
              className="futuristic-input"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="text-sm font-medium mb-2 block font-futuristic">
              Message (Optional)
            </label>
            <Textarea
              id="message"
              placeholder="Add a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="futuristic-input"
            />
          </div>

          {/* Preview */}
          <Card className={`p-4 glass ${computedTheme === 'dark' ? 'border-border/30' : 'border-border/60'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sending to</p>
                <p className="font-medium font-futuristic">@{recipient.username}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium font-futuristic">
                  {amount || '0.000'} {currency}
                </p>
              </div>
            </div>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg glass">
              {error}
            </div>
          )}
        </div>

        <ModalFooter>
          <FuturisticButton
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
            className="futuristic-button"
          >
            Cancel
          </FuturisticButton>
          <FuturisticButton
            onClick={handleSendGift}
            disabled={isSending || !amount || parseFloat(amount) <= 0}
            isLoading={isSending}
            className="futuristic-button"
          >
            <Gift className="w-4 h-4 mr-2" />
            Send Gift
          </FuturisticButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}