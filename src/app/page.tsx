import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Real-time Chat for Modern Teams
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect, collaborate, and communicate seamlessly with our powerful chat platform.
              Built for teams that value real-time interaction and productivity.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Chat Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Real-time Messaging</CardTitle>
                <CardDescription>
                  Instant message delivery with real-time updates and notifications
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Create channels and groups for seamless team communication
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  End-to-end encryption and advanced security features
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized performance for the best user experience
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams already using our platform to communicate better.
          </p>
          <Button size="lg" className="text-lg">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}