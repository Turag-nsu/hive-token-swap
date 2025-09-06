'use client';

import Link from 'next/link';
import { 
  Lock, 
  User, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Key
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Alert, AlertDescription } from '@/components/ui/Alert';

export default function WalletSetupGuide() {
  const steps = [
    {
      id: 1,
      title: 'Choose Your Wallet Method',
      description: 'Select between installing the HiveKeychain browser extension or using HiveSigner for authentication.',
      icon: Key,
      actions: [
        {
          label: 'Install HiveKeychain',
          url: 'https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep'
        },
        {
          label: 'Use HiveSigner',
          url: 'https://hivesigner.com'
        }
      ]
    },
    {
      id: 2,
      title: 'Set Up Your Account',
      description: 'Create or import your Hive account depending on your chosen authentication method.',
      icon: User,
      actions: [
        {
          label: 'HiveKeychain Setup',
          url: 'https://hive-keychain.com/docs'
        },
        {
          label: 'HiveSigner Setup',
          url: 'https://hivesigner.com/docs'
        }
      ]
    },
    {
      id: 3,
      title: 'Verify Connection',
      description: 'Make sure your wallet is properly connected and ready to use.',
      icon: Lock,
      actions: [
        {
          label: 'Test Connection',
          url: '/test'
        }
      ]
    }
  ];

  const troubleshootingTips = [
    'Make sure you have at least one Hive account configured in your chosen wallet method',
    'Check that the HiveKeychain extension is enabled and not blocked by your browser',
    'If using HiveSigner, ensure you have a valid account and access token',
    'Try refreshing the page after setting up or connecting your wallet',
    'Ensure you are using a supported browser (Chrome, Firefox, Brave)',
    'If you continue to have issues, try restarting your browser'
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Hive Wallet Setup Guide</h1>
          <p className="text-muted-foreground">
            Follow these steps to set up your Hive wallet and start trading tokens
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Wallet Connection Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                You can connect to our platform using either HiveKeychain (browser extension) or HiveSigner (OAuth-based authentication).
                Both methods provide secure, non-custodial access to your Hive account.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.id}>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      {step.actions && (
                        <div className="flex flex-wrap gap-2">
                          {step.actions.map((action, index) => (
                            <Button 
                              key={index} 
                              asChild 
                              variant="outline" 
                              size="sm"
                            >
                              <Link href={action.url} target="_blank" rel="noopener noreferrer">
                                {action.label}
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Troubleshooting Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {troubleshootingTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-muted-foreground mt-1 mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}