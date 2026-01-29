<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // ADMIN: Assign task
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
            'content_type' => 'required|string',
            'remark' => 'nullable|string',
        ]);

        return Task::create($data);
    }

    // ADMIN: View pending tasks (user wise)
    public function adminTasks()
    {
        return Task::with(['user', 'company'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // USER: View my tasks
   public function myTasks()
{
    $user = auth()->user();  // logged-in user

    $tasks = Task::where('user_id', $user->id)
        ->with(['company'])  // load company details
        ->orderBy('created_at', 'DESC')
        ->get();

    return response()->json($tasks);
}


    // USER: Mark completed
    public function complete($id)
    {
        $task = Task::findOrFail($id);
        $task->update(['status' => 'completed']);

        return $task;
    }
    public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:assigned,completed'
    ]);

    $task = Task::findOrFail($id);

    // admin toggles only if NOT doing
    if ($task->status === "doing") {
        return response()->json([
            "message" => "User is currently doing the task. Admin cannot change now."
        ], 403);
    }

    $task->status = $request->status;
    $task->save();

    return response()->json($task);
}

}
