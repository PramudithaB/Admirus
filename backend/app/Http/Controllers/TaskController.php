<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // ==========================
    // ADMIN: Create / Assign Task
    // ==========================
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'company_id' => 'required|exists:companies,id',
            'content_type' => 'required|string',
            'remark' => 'nullable|string',
        ]);

        $data['status'] = 'assigned'; // default

        return Task::create($data);
    }

    // ==========================
    // ADMIN: View All Tasks (pending/assigned)
    // ==========================
    public function adminTasks()
    {
        return Task::with(['user', 'company'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // ==========================
    // USER: View My Tasks
    // ==========================
    public function myTasks()
    {
        $user = auth()->user();  // Logged-in user

        $tasks = Task::where('user_id', $user->id)
            ->with(['company'])
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json($tasks);
    }

    // ==========================
    // USER: Start Task (assigned → doing)
    // ==========================
    public function userStartTask($id)
    {
        $task = Task::findOrFail($id);

        if ($task->status !== 'assigned') {
            return response()->json(['error' => 'Task already started or completed'], 400);
        }

        $task->status = 'doing';
        $task->save();

        return response()->json($task);
    }

    // ==========================
    // USER: Submit Task (doing → submitted)
    // ==========================
    public function userSubmitTask($id)
    {
        $task = Task::findOrFail($id);

        if ($task->status !== 'doing') {
            return response()->json(['error' => 'Task must be in doing stage to submit'], 400);
        }

        $task->status = 'submitted';
        $task->save();

        return response()->json($task);
    }

    // ==========================
    // ADMIN: Complete Task (submitted → completed)
    // ==========================
    public function adminCompleteTask($id)
    {
        $task = Task::findOrFail($id);

        if ($task->status !== 'submitted') {
            return response()->json(['error' => 'User has not submitted task yet'], 400);
        }

        $task->status = 'completed';
        $task->save();

        return response()->json($task);
    }

    // ==========================
    // ADMIN: Toggle Assigned/Completed (backup usage)
    // ==========================
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:assigned,completed'
        ]);

        $task = Task::findOrFail($id);

        // ❌ Admin cannot override "doing" or "submitted"
        if (in_array($task->status, ['doing', 'submitted'])) {
            return response()->json([
                "message" => "Task is in progress or submitted. Admin cannot force update."
            ], 403);
        }

        $task->status = $request->status;
        $task->save();

        return response()->json($task);
    }
}
