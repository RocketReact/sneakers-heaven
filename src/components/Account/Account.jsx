import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card.jsx";
import { Button } from "../../ui/Button.jsx";
import { Input } from "../../ui/Input.jsx";
import { Label } from "../../ui/Label.jsx";

export default function Account  ()  {
    return (
        <div className="flex justify-center items-center mt-10">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your name" className="mt-1 w-full" />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" className="mt-1 w-full" />
                        </div>
                        <div>
                            <Label htmlFor="password">New Password</Label>
                            <Input id="password" type="password" placeholder="Enter new password" className="mt-1 w-full" />
                        </div>
                        <Button className="w-full mt-4">Update Account</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};



